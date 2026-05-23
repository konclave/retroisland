import type { APIRoute } from 'astro';
import { readFileSync } from 'fs';
import { join } from 'path';
import { remark } from 'remark';
import strip from 'strip-markdown';

const RSS_TITLE_LENGTH = 100;

async function getRssTitle(markdown: string): Promise<string> {
  const clean = String(await remark().use(strip).process(markdown));
  return clean.length > RSS_TITLE_LENGTH ? clean.slice(0, RSS_TITLE_LENGTH) + '...' : clean;
}

export const GET: APIRoute = async () => {
  let news: any[] = [];
  try {
    news = JSON.parse(readFileSync(join(process.cwd(), 'src/content/news.json'), 'utf-8'));
  } catch {
    // content not generated yet
  }

  const entries = await Promise.all(
    news.map(async (item) => ({
      title: await getRssTitle(item.text),
      description: item.html,
      pubDate: new Date(item.date).toUTCString(),
      guid: item.id,
    })),
  );

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
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
        (e) => `
    <item>
      <title><![CDATA[${e.title}]]></title>
      <description><![CDATA[${e.description}]]></description>
      <pubDate>${e.pubDate}</pubDate>
      <guid isPermaLink="false">${e.guid}</guid>
    </item>`,
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=2419200',
    },
  });
};
