#!/usr/bin/env node
/**
 * Transforms the Contentful export (generated/contentful-data.json) into
 * static JSON files under src/content/ for use by the Astro static site.
 *
 * Run after: node scripts/contentful-export.mjs export
 * Usage:     node scripts/transform-content.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const EXPORT_FILE = join(ROOT, 'generated', 'contentful-data.json');
const CONTENT_DIR = join(ROOT, 'src', 'content');
const LOCALE = 'ru-RU';
const FILE_STORAGE = (process.env['FILE_STORAGE'] || '').replace(/\/$/, '');

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get locale value from a Contentful localized field map */
const g = (fields, key) => fields?.[key]?.[LOCALE];

/** Prepend FILE_STORAGE base URL to relative links */
function attachStorageUrl(link) {
  if (!link || /https?:\/\//.test(link)) return link ?? '';
  return `${FILE_STORAGE}${link}`;
}

/** Write JSON to path, creating parent dirs as needed */
function writeJson(filePath, data) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`  wrote ${filePath.replace(ROOT + '/', '')}`);
}

// ── Load export ───────────────────────────────────────────────────────────────

if (!existsSync(EXPORT_FILE)) {
  console.error(`Export file not found: ${EXPORT_FILE}`);
  console.error('Run: node scripts/contentful-export.mjs export');
  process.exit(1);
}

console.log('Reading Contentful export...');
const raw = JSON.parse(readFileSync(EXPORT_FILE, 'utf-8'));

// ── Build lookup maps ─────────────────────────────────────────────────────────

const entriesById = Object.fromEntries(raw.entries.map((e) => [e.sys.id, e]));

const assetsById = Object.fromEntries(
  raw.assets.map((a) => {
    const file = g(a.fields, 'file');
    return [
      a.sys.id,
      {
        id: a.sys.id,
        title: g(a.fields, 'title') || '',
        description: g(a.fields, 'description') || '',
        url: file?.url ? `https:${file.url}` : '',
        contentType: file?.contentType || '',
        width: file?.details?.image?.width ?? null,
        height: file?.details?.image?.height ?? null,
      },
    ];
  })
);

function resolveEntry(link) {
  return entriesById[link?.sys?.id] ?? null;
}

function resolveAsset(link) {
  return assetsById[link?.sys?.id] ?? null;
}

// ── Thumbnail helpers ─────────────────────────────────────────────────────────

function getYoutubeThumbnail(url) {
  if (/youtu\.be/.test(url) || /youtube\.com/.test(url)) {
    const id = url.split('/').at(-1);
    return `https://i3.ytimg.com/vi/${id}/hqdefault.jpg`;
  }
  return '';
}

async function getOkruThumbnail(url) {
  try {
    const id = url.split('/').at(-1);
    const { load } = await import('cheerio');
    const response = await fetch('https://m.ok.ru/live/' + id);
    const page = await response.text();
    const $ = load(page);
    return $('img.vdo.thumb')?.[0]?.attribs.src || '';
  } catch {
    return '';
  }
}

async function getThumbnailUrl(url) {
  if (/youtu\.be/.test(url) || /youtube\.com/.test(url)) {
    return getYoutubeThumbnail(url);
  }
  if (/https?:\/\/ok\.ru/.test(url)) {
    return getOkruThumbnail(url);
  }
  return '';
}

// ── Rich text → HTML ──────────────────────────────────────────────────────────

function richTextToHtml(document) {
  if (!document || document.nodeType !== 'document') return '';
  return documentToHtmlString(document, {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = resolveAsset(node.data.target);
        if (!asset?.url) return '';
        const mimeGroup = asset.contentType.split('/')[0];
        if (mimeGroup === 'image') {
          return `<div class="about-author__image"><img src="${asset.url}" alt="${asset.title}" /></div>`;
        }
        return '';
      },
    },
  });
}

// ── DTO mappers ───────────────────────────────────────────────────────────────

function mapTrack(trackEntry) {
  if (!trackEntry) return null;
  const f = trackEntry.fields;
  return {
    id: trackEntry.sys.id,
    title: g(f, 'title') || '',
    link: attachStorageUrl(g(f, 'link') || ''),
    length: g(f, 'length') || '',
    youtube: g(f, 'youtube') || '',
    ok: g(f, 'ok') || '',
    shortDescription: g(f, 'shortDescription') || '',
  };
}

function mapAlbum(albumEntry) {
  if (!albumEntry) return null;
  const f = albumEntry.fields;
  return {
    id: albumEntry.sys.id,
    title: g(f, 'title') || '',
    tracks: (g(f, 'tracks') || [])
      .map(resolveEntry)
      .filter(Boolean)
      .map(mapTrack)
      .filter(Boolean),
  };
}

function mapOuterLink(linkEntry) {
  if (!linkEntry) return null;
  const f = linkEntry.fields;
  return {
    id: linkEntry.sys.id,
    link: attachStorageUrl(g(f, 'link') || ''),
    title: g(f, 'title') || '',
    description: g(f, 'description') || '',
  };
}

async function mapVideo(videoEntry) {
  if (!videoEntry) return null;
  const f = videoEntry.fields;
  const url = g(f, 'url');
  if (!url) return null;
  const thumbnailLink = g(f, 'thumbnail');
  const thumbUrl = thumbnailLink
    ? resolveAsset(thumbnailLink)?.url || (await getThumbnailUrl(url))
    : await getThumbnailUrl(url);
  return {
    url,
    thumbUrl: thumbUrl || '',
    title: g(f, 'title') || '',
  };
}

// ── Catalogue entries ─────────────────────────────────────────────────────────

console.log('\n── Catalogue ──');
const catalogueEntries = raw.entries
  .filter((e) => e.sys.contentType?.sys?.id === 'catalogueEntry')
  .sort((a, b) =>
    (g(a.fields, 'title') || '').localeCompare(g(b.fields, 'title') || '', 'ru')
  );

const catalogueList = [];

for (const entry of catalogueEntries) {
  const f = entry.fields;
  const slug = g(f, 'slug');
  if (!slug) continue;

  const videos = await Promise.all(
    (g(f, 'videos') || []).map(resolveEntry).filter(Boolean).map(mapVideo)
  );

  const dto = {
    id: entry.sys.id,
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    title: g(f, 'title') || '',
    shortTitle: g(f, 'shortTitle') || '',
    slug,
    shortDescription: g(f, 'shortDescription') || '',
    description: richTextToHtml(g(f, 'description')),
    images: (g(f, 'images') || []).map(resolveAsset).filter(Boolean),
    albums: (g(f, 'albums') || [])
      .map(resolveEntry)
      .filter(Boolean)
      .map(mapAlbum)
      .filter(Boolean),
    acknowledgements: g(f, 'acknowledgements') || [],
    acknowledgementText: g(f, 'acknowledgementText') || '',
    videos: videos.filter(Boolean),
    links: (g(f, 'links') || [])
      .map(resolveEntry)
      .filter(Boolean)
      .map(mapOuterLink)
      .filter(Boolean),
  };

  catalogueList.push({
    id: dto.id,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    slug,
    title: dto.title,
    shortTitle: dto.shortTitle,
  });

  writeJson(join(CONTENT_DIR, 'catalogue', `${slug}.json`), dto);
}

writeJson(join(CONTENT_DIR, 'catalogue-list.json'), catalogueList);
console.log(`  total: ${catalogueList.length} entries`);

// ── News ──────────────────────────────────────────────────────────────────────

console.log('\n── News ──');
const newsEntries = raw.entries
  .filter((e) => e.sys.contentType?.sys?.id === 'newsItem')
  .sort((a, b) => {
    const dA = g(a.fields, 'published') || a.sys.createdAt;
    const dB = g(b.fields, 'published') || b.sys.createdAt;
    return new Date(dB) - new Date(dA);
  });

const newsDto = await Promise.all(
  newsEntries.map(async (item) => {
    const f = item.fields;
    const text = g(f, 'text') || '';
    const html = String(await remark().use(remarkHtml).process(text));
    return {
      id: item.sys.id,
      text,
      html,
      link: g(f, 'link') || '',
      date: g(f, 'published') || item.sys.createdAt,
    };
  })
);

writeJson(join(CONTENT_DIR, 'news.json'), newsDto);
console.log(`  total: ${newsDto.length} items`);

// ── Requested items ───────────────────────────────────────────────────────────

console.log('\n── Requested items ──');
const requestedEntries = raw.entries
  .filter((e) => e.sys.contentType?.sys?.id === 'requestedItem')
  .sort((a, b) => new Date(a.sys.createdAt) - new Date(b.sys.createdAt));

const requestedDto = requestedEntries.map((item) => {
  const f = item.fields;
  return {
    id: item.sys.id,
    artist: g(f, 'artist') || '',
    album: g(f, 'album') || '',
    title: g(f, 'title') || '',
    tracks: (g(f, 'tracks') || [])
      .map(resolveEntry)
      .filter(Boolean)
      .map(mapTrack)
      .filter(Boolean),
  };
});

writeJson(join(CONTENT_DIR, 'requested.json'), requestedDto);
console.log(`  total: ${requestedDto.length} items`);

// ── Static pages ──────────────────────────────────────────────────────────────

console.log('\n── Static pages ──');

// about-author (entry ID: 6ZwKknoeHy5hvPCKBdUYvC)
const aboutAuthorEntry = entriesById['6ZwKknoeHy5hvPCKBdUYvC'];
if (aboutAuthorEntry) {
  const f = aboutAuthorEntry.fields;
  writeJson(join(CONTENT_DIR, 'pages', 'about-author.json'), {
    text: richTextToHtml(g(f, 'text')),
    gallery: (g(f, 'gallery') || []).map(resolveAsset).filter(Boolean),
  });
} else {
  console.warn('  WARNING: about-author entry not found');
}

// about-project (entry ID: 71D9JjHYkgwpAn8w5rrVGf)
const aboutProjectEntry = entriesById['71D9JjHYkgwpAn8w5rrVGf'];
if (aboutProjectEntry) {
  const f = aboutProjectEntry.fields;
  writeJson(join(CONTENT_DIR, 'pages', 'about-project.json'), {
    text: richTextToHtml(g(f, 'text')),
    links: (g(f, 'links') || [])
      .map(resolveEntry)
      .filter((e) => e && e.fields)
      .map(mapOuterLink)
      .filter(Boolean),
  });
} else {
  console.warn('  WARNING: about-project entry not found');
}

// index page / communities (entry ID: 5JMor9jC2OuNal1Eb5kfhy)
const indexPageEntry = entriesById['5JMor9jC2OuNal1Eb5kfhy'];
if (indexPageEntry) {
  const f = indexPageEntry.fields;
  writeJson(join(CONTENT_DIR, 'pages', 'index.json'), {
    links: (g(f, 'links') || [])
      .map(resolveEntry)
      .filter((e) => e && e.fields)
      .map(mapOuterLink)
      .filter(Boolean),
  });
} else {
  console.warn('  WARNING: index page entry not found');
}

console.log('\nDone!');
