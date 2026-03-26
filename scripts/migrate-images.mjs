/**
 * Download all Contentful CDN images → public/images/ and generate avif/webp variants.
 * Rewrites src/content/**\/*.json to use local paths (safe to run multiple times).
 *
 * Source of truth: generated/contentful-data.json (raw Contentful export).
 * Run `npm run content:export` first if the file is missing.
 *
 * Usage:
 *   node scripts/migrate-images.mjs           # download + rewrite
 *   node scripts/migrate-images.mjs --dry-run # preview only, no writes
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, basename, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const EXPORT_FILE = join(ROOT, 'generated/contentful-data.json');
const CONTENT_DIR = join(ROOT, 'src/content');
const PUBLIC_IMAGES_DIR = join(ROOT, 'public/images');

const dryRun = process.argv.includes('--dry-run');
if (dryRun) console.log('[dry-run] No files will be written.\n');

// ─── Guard: require Contentful export ────────────────────────────────────────

if (!existsSync(EXPORT_FILE)) {
  console.error('Error: generated/contentful-data.json not found.');
  console.error('Run: npm run content:export');
  process.exit(1);
}

// ─── Parse asset-id and filename from Contentful URL ─────────────────────────
// URL pattern: https://images.ctfassets.net/{space}/{asset-id}/{hash}/{filename}

function parseContentfulUrl(url) {
  const u = new URL(url);
  const parts = u.pathname.split('/').filter(Boolean);
  // parts: [space, asset-id, hash, filename]
  if (parts.length < 4) return null;
  return { assetId: parts[1], filename: parts[3] };
}

// ─── Sync recursive JSON file walk ───────────────────────────────────────────

function walkJson(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkJson(full));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      results.push(full);
    }
  }
  return results;
}

// ─── Download image ───────────────────────────────────────────────────────────

async function downloadImage(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Build URL map from raw Contentful export (image assets only)
  const raw = JSON.parse(readFileSync(EXPORT_FILE, 'utf-8'));
  const imageAssets = raw.assets.filter((a) => {
    const file = a.fields?.file?.['ru-RU'];
    return file?.contentType?.startsWith('image/');
  });

  console.log(`Found ${imageAssets.length} image assets in Contentful export.\n`);

  const urlMap = new Map(); // contentfulUrl → localPath
  for (const asset of imageAssets) {
    const file = asset.fields.file['ru-RU'];
    const contentfulUrl = `https:${file.url}`; // protocol-relative → https
    const parsed = parseContentfulUrl(contentfulUrl);
    if (!parsed) {
      console.warn(`[WARN] Could not parse URL: ${contentfulUrl}`);
      continue;
    }
    urlMap.set(contentfulUrl, `/images/${parsed.assetId}/${parsed.filename}`);
  }

  if (dryRun) {
    for (const [contentfulUrl, localPath] of urlMap) {
      console.log(`  ${contentfulUrl}`);
      console.log(`    → ${localPath}\n`);
    }
    return;
  }

  // Download and convert each image
  let downloaded = 0;
  let skipped = 0;
  let errors = 0;
  const failed = new Set(); // URLs that failed — don't rewrite these

  for (const [contentfulUrl, localPath] of urlMap) {
    const parsed = parseContentfulUrl(contentfulUrl);
    const { assetId, filename } = parsed;
    const destDir = join(PUBLIC_IMAGES_DIR, assetId);
    const destOriginal = join(destDir, filename);
    const base = basename(filename, extname(filename));
    const destWebp = join(destDir, `${base}.webp`);
    const destAvif = join(destDir, `${base}.avif`);

    if (existsSync(destOriginal) && existsSync(destWebp) && existsSync(destAvif)) {
      console.log(`[skip] ${filename}`);
      skipped++;
      continue;
    }

    try {
      console.log(`[download] ${filename} …`);
      const buffer = await downloadImage(contentfulUrl);

      mkdirSync(destDir, { recursive: true });
      writeFileSync(destOriginal, buffer);
      await sharp(buffer).webp({ quality: 82 }).toFile(destWebp);
      await sharp(buffer).avif({ quality: 60 }).toFile(destAvif);

      downloaded++;
    } catch (err) {
      console.error(`[error] ${filename}: ${err.message}`);
      errors++;
      failed.add(contentfulUrl);
    }
  }

  console.log(`\nDownloaded: ${downloaded}, Skipped: ${skipped}, Errors: ${errors}\n`);

  // Rewrite JSON files — replace any remaining Contentful URLs with local paths
  const jsonFiles = walkJson(CONTENT_DIR);
  let rewrittenFiles = 0;

  for (const file of jsonFiles) {
    let text = readFileSync(file, 'utf8');
    let changed = false;
    for (const [contentfulUrl, localPath] of urlMap) {
      if (failed.has(contentfulUrl)) continue;
      if (text.includes(contentfulUrl)) {
        text = text.replaceAll(contentfulUrl, localPath);
        changed = true;
      }
    }
    if (changed) {
      writeFileSync(file, text, 'utf8');
      console.log(`[rewrite] ${file.replace(ROOT + '/', '')}`);
      rewrittenFiles++;
    }
  }

  if (rewrittenFiles > 0) {
    console.log(`\nRewritten ${rewrittenFiles} JSON files.`);
  } else {
    console.log('No JSON files needed rewriting (already up to date).');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
