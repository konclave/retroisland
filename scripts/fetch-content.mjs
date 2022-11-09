#! /usr/bin/env node
import * as cheerio from 'cheerio';
import { createHash } from 'crypto';
import { writeFileSync, readFileSync } from 'fs';

main();

function main() {
  let saved;
  try {
    saved = JSON.parse(readFileSync('generated/data.json').toString());
  } catch {
    saved = {};
  }

  fetchHtml('https://retroisland.net').then(async (indexHtml) => {
    const indexHash = getHash(indexHtml);
    const news = await loadNews(indexHtml, saved);
    const albums = loadAlbums(indexHtml, saved);
    const data = {
      hash: indexHash,
      news,
      albums,
    };
    writeFileSync('generated/data.json', JSON.stringify(data, null, 2));
  });
}

function getHash(content) {
  return createHash('md5').update(content).digest('hex');
}

async function fetchHtml(url) {
  const headers = new Headers();
  headers.append('Content-Type', 'text/plain; charset=cp1251');
  const response = await fetch(url, headers);
  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder('cp1251');
  const html = decoder.decode(buffer);
  return html;
}

async function loadNews(html, saved) {
  const $ = cheerio.load(html);
  const $newsContainer = $('table.pole tr:nth-child(2)');
  const hash = getHash($newsContainer.html());

  if (hash === saved?.news?.hash) {
    console.log('[news] Content was not changed');
    return saved.news;
  }

  const items = $newsContainer
    .find('p')
    .get()
    .reduce((acc, p) => {
      const content = $(p).text();
      const hash = getHash(content);
      const parsed = content.match(/(\d{2}\.\d{2}\.\d{4}) (.+)/);

      if (parsed) {
        const [, published, text] = parsed;
        const [date, month, year] = published.split('.');
        const dateIso =
          date && month && year
            ? new Date(Date.UTC(year, month - 1, date)).toISOString()
            : null;
        acc[dateIso] = {
          hash,
          text: typography(text.trim()),
        };
      }
      return acc;
    }, saved.news?.items || {});

  return {
    hash,
    items,
  };
}

async function loadAlbums(html, saved) {
  return {
    items: [],
  };
}

function typography(str) {
  return str
    .replace(/ "/g, ' «')
    .replace(/^"/g, '«')
    .replace(/"([ ,.])/g, '»$1')
    .replace(/"$/g, '»')
    .replace(' - ', ' – ');
}
