#! /usr/bin/env node
// TODO: Валентин Бадьяров – пофиксил название альбома "Группа Валентина Бадьярова - альбом "Песни Олега Иванова" (послдений альбом – был пустой)
// При апдейте артиста пофиксить заново
import * as cheerio from 'cheerio';
import { createHash } from 'crypto';
import { writeFileSync, readFileSync } from 'fs';

const HOST = 'https://retroisland.net';

main();

function main() {
  console.log(
    'Валентин Бадьяров – пофиксил название альбома "Группа Валентина Бадьярова - альбом "Песни Олега Иванова" (послдений альбом – был пустой) При апдейте артиста пофиксить заново'
  );

  const saved = readStoredData();

  fetchHtml(HOST).then(async (indexHtml) => {
    const indexHash = getHash(indexHtml);

    const news = await loadNews(indexHtml, saved);
    const singers = await loadSingers(indexHtml, saved);

    const data = {
      hash: indexHash,
      news,
      singers: { ...singers },
    };

    writeFileSync('generated/data.json', JSON.stringify(data, null, 2));
  });
}

function readStoredData() {
  try {
    return JSON.parse(readFileSync('generated/data.json').toString());
  } catch {
    return {};
  }
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
    .reduce(foldNews, saved.news?.items || {});

  return {
    hash,
    items,
  };
}

function foldNews(acc, p) {
  const content = $(p).text();
  const hash = getHash(content);
  const parsed = content.match(/(\d{2}\.\d{2}\.\d{4}) (.+)/);

  if (!parsed) {
    return acc;
  }

  const [, published, text] = parsed;
  const [date, month, year] = published.split('.');
  const dateIso = getDateIso(year, month, date);
  acc[dateIso] = {
    hash,
    text: typography(text.trim()),
  };

  return acc;
}

function getDateIso() {
  return date && month && year
    ? new Date(Date.UTC(year, month - 1, date)).toISOString()
    : null;
}

async function loadSingers(html, saved) {
  const $ = cheerio.load(html);
  const $links = $('td.pole ol li a');

  const links = $links.get().map((anchor) => {
    return HOST + '/' + $(anchor).attr('href');
  });

  const items = await Promise.all(links.map(fetchAlbums(saved)));

  const result = items.reduce((acc, entry) => {
    const [key, value] = Object.entries(entry)[0];
    acc[key] = value;
    return acc;
  }, {});

  return result;
}

function fetchAlbums(saved) {
  return async (url) => {
    const html = await fetchHtml(url);
    const hash = getHash(html);

    const $ = cheerio.load(html);
    const singer = $('.hid > font[color="#666666"]')
      .text()
      .replace(/\s+/g, ' ')
      .trim();

    if (saved.singers[getHash(singer)]?.hash === hash) {
      console.log(`[singers] "${singer}" page content was not changed`);
      return { [getHash(singer)]: saved.singers[getHash(singer)] };
    }

    const result = {
      hash,
      singer,
      albums: [],
    };

    const albums = $('ol');
    albums.each(iterateAlbums(result));

    console.log(`[singers] "${singer}" data updated`);

    return {
      [getHash(singer)]: result,
    };
  };
}

function interateAlbums(result) {
  return (idx, album) => {
    let title = typography($(album).children(':not(li)').text().trim());
    if (!title) {
      title = $(album).prev(':not(ol)').text().trim();
    }
    const albumObj = {
      title,
      tracks: [],
      videos: [],
      otherLinks: [],
    };

    $(album).find('li').each(iterateTracks(albumObj));

    if (albumObj.tracks.length) {
      result.albums.push(albumObj);
    }
  };
}

function interateTracks(albumObj) {
  return (idx, track) => {
    const $track = $(track);
    const $anchor = $track.find('a');
    const link = $anchor
      .attr('href')
      .replace(/https?:\/\/retroisland\.net/, '');

    const title = typography($anchor.text().trim());
    const subtitle = typography(
      $track.text().replace(title, '').replaceAll('  ', '').trim()
    );

    if (link.includes('.mp3')) {
      albumObj.tracks.push({
        title,
        subtitle,
        link,
      });
    }
  };
}

function typography(str) {
  return str
    .replace(/ "/g, ' «')
    .replace(/^"/g, '«')
    .replace(/"([ ,.])/g, '»$1')
    .replace(/"$/g, '»')
    .replace(/\s-\s/g, ' – ')
    .replace(/\s+/g, ' ');
}
