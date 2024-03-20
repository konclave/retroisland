import type { LoaderFunction } from '@remix-run/node';
import type { RssEntry } from '~/loaders';
import { rssLoader } from '~/loaders';

export const loader: LoaderFunction = rssLoader;

export function generateRss({ entries = [] }: { entries: RssEntry[] }): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Васильевский Остров</title>
    <description>Авторский сайт о вокально-инструментальных ансамблях и музыке советской эпохи</description>
    <link>https://retroisland.net</link>
    <language>ru-RU</language>
    <ttl>60</ttl>
    <atom:link href="https://retroisland.net/rss.xml" rel="self" type="application/rss+xml" />
    ${entries
      .map(
        (entry) => `
      <item>
        <title><![CDATA[${entry.title.slice(0, 255)}]]></title>
        <description><![CDATA[${entry.title}]]></description>
        <pubDate>${entry.pubDate}</pubDate>
        ${entry.guid ? `<guid isPermaLink="false">${entry.guid}</guid>` : ''}
      </item>`
      )
      .join('')}
  </channel>
</rss>`;
}
