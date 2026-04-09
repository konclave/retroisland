/**
 * Download video thumbnails → public/images/video-thumbnails/{slug}/{index}.jpg
 * Rewrites src/content/catalogue/*.json to add localThumbUrl alongside thumbUrl.
 * Safe to run multiple times — skips already-downloaded files.
 *
 * Usage:
 *   node scripts/migrate-video-thumbnails.mjs           # download + rewrite
 *   node scripts/migrate-video-thumbnails.mjs --dry-run # preview only, no writes
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, basename, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CATALOGUE_DIR = join(ROOT, 'src/content/catalogue');
const THUMBS_DIR = join(ROOT, 'public/images/video-thumbnails');

const dryRun = process.argv.includes('--dry-run');
if (dryRun) console.log('[dry-run] No files will be written.\n');

// ─── Fix malformed YouTube thumbnail URL ─────────────────────────────────────
// transform-content.mjs used split('/').at(-1) on watch?v=ID URLs, producing
// thumbUrl like: https://i3.ytimg.com/vi/watch?v=ID/hqdefault.jpg
// We recover the real ID from the video's url field instead.

function fixYouTubeThumbUrl(thumbUrl, videoUrl) {
  if (!thumbUrl.includes('/vi/watch?v=')) return thumbUrl;
  const match = videoUrl.match(/[?&]v=([^&]+)/);
  if (!match) return thumbUrl;
  return `https://i3.ytimg.com/vi/${match[1]}/hqdefault.jpg`;
}

const BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// ─── Download image ───────────────────────────────────────────────────────────

async function downloadImage(url) {
  const headers = url.includes('okcdn.ru') ? { 'User-Agent': BROWSER_UA } : {};
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

// Scrape OK.ru page for a fresh thumbnail URL when CDN token has expired.
// Tries img.vdo.thumb (mobile live page) then og:image (video page).
async function scrapeOkruThumbnail(videoUrl) {
  const id = videoUrl.split('/').at(-1);
  const { load } = await import('cheerio');
  const headers = { 'User-Agent': BROWSER_UA };

  // Strategy 1: mobile live page
  try {
    const res = await fetch('https://m.ok.ru/live/' + id, { headers });
    const $ = load(await res.text());
    const src = $('img.vdo.thumb').attr('src');
    if (src) return src;
  } catch {}

  // Strategy 2: og:image from video page
  try {
    const res = await fetch('https://ok.ru/video/' + id, { headers });
    const $ = load(await res.text());
    const content = $('meta[property="og:image"]').attr('content');
    if (content) return content;
  } catch {}

  return null;
}

// Download the thumbnail via headless Chromium, which sends proper Client Hints
// headers (sec-ch-ua etc.) that OK.ru CDN requires. Returns the image Buffer.
// The og:image URL on the rendered page may point to a CDN that only responds
// to requests with these browser-specific headers.
async function downloadWithPlaywright(thumbUrl, videoUrl) {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    // Load the video page first to establish browser context (cookies, Client Hints)
    await page.goto(videoUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Fetch the thumbnail with image-specific Sec-Fetch headers — OK.ru CDN
    // returns 500 without Sec-Fetch-Dest: image even with correct Client Hints.
    const response = await context.request.get(thumbUrl, {
      headers: {
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
        'Referer': videoUrl,
      },
    });
    if (!response.ok()) throw new Error(`HTTP ${response.status()} for ${thumbUrl}`);
    return Buffer.from(await response.body());
  } finally {
    await browser.close();
  }
}

// Retry OK.ru errors:
//   500 → idx may exceed frame count, retry with idx=0
//   400 → token expired, scrape OK.ru page for a fresh thumbnail URL
async function downloadImageWithFallback(thumbUrl, videoUrl) {
  try {
    return await downloadImage(thumbUrl);
  } catch (err) {
    if (!thumbUrl.includes('okcdn.ru')) throw err;

    if (err.message.startsWith('HTTP 500')) {
      const fallback = thumbUrl.replace(/idx=\d+/, 'idx=0');
      if (fallback !== thumbUrl) {
        try {
          return await downloadImage(fallback);
        } catch (err2) {
          if (!err2.message.startsWith('HTTP 4')) throw err2;
          // fall through to scrape
        }
      }
    }

    if (err.message.startsWith('HTTP 4') || err.message.startsWith('HTTP 5')) {
      if (!videoUrl) throw err;
      // Try static scrape first (cheaper)
      const freshUrl = await scrapeOkruThumbnail(videoUrl);
      if (freshUrl) {
        try { return await downloadImage(freshUrl); } catch {}
      }
      // Last resort: use Playwright browser context with full browser headers
      // (Client Hints + Sec-Fetch-Dest: image required by OK.ru CDN)
      return await downloadWithPlaywright(thumbUrl, videoUrl);
    }

    throw err;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const files = readdirSync(CATALOGUE_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => join(CATALOGUE_DIR, f));

  let downloaded = 0;
  let skipped = 0;
  let errors = 0;

  for (const filePath of files) {
    const slug = basename(filePath, '.json');
    const entry = JSON.parse(readFileSync(filePath, 'utf-8'));

    if (!entry.videos?.length) continue;

    let fileChanged = false;

    for (let i = 0; i < entry.videos.length; i++) {
      const video = entry.videos[i];
      if (!video.thumbUrl) continue;

      const destDir = join(THUMBS_DIR, slug);
      const destFile = join(destDir, `${i}.jpg`);
      const localPath = `/images/video-thumbnails/${slug}/${i}.jpg`;

      if (dryRun) {
        const resolvedThumbUrl = fixYouTubeThumbUrl(video.thumbUrl, video.url);
        console.log(`[would download] ${slug}/${i}.jpg`);
        console.log(`  from: ${resolvedThumbUrl}`);
        continue;
      }

      if (existsSync(destFile)) {
        console.log(`[skip] ${slug}/${i}.jpg`);
        skipped++;
        if (video.localThumbUrl !== localPath) {
          video.localThumbUrl = localPath;
          fileChanged = true;
        }
        continue;
      }

      try {
        console.log(`[download] ${slug}/${i}.jpg …`);
        const resolvedThumbUrl = fixYouTubeThumbUrl(video.thumbUrl, video.url);
        const buffer = await downloadImageWithFallback(resolvedThumbUrl, video.url);

        mkdirSync(destDir, { recursive: true });
        writeFileSync(destFile, buffer);

        video.localThumbUrl = localPath;
        fileChanged = true;
        downloaded++;
      } catch (err) {
        console.error(`[error] ${slug}/${i}.jpg: ${err.message}`);
        errors++;
      }
    }

    if (fileChanged) {
      writeFileSync(filePath, JSON.stringify(entry, null, 2) + '\n', 'utf-8');
      console.log(`[rewrite] src/content/catalogue/${slug}.json`);
    }
  }

  if (!dryRun) {
    console.log(`\nDownloaded: ${downloaded}, Skipped: ${skipped}, Errors: ${errors}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
