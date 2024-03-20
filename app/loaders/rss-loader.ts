import { fetchNews } from '~/data-fetch';
import { remark } from 'remark';
import strip from 'strip-markdown';

const RSS_TITLE_LENGTH = 100;

export type RssEntry = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author?: string;
  guid?: string;
};

export const rssLoader = async () => {
  const news = await fetchNews();
  const entries = await Promise.all(
    news.items.map(async (item) => ({
      title: await getRssTitle(item.text),
      link: 'https://retroisland.net/news-archive',
      description: item.html,
      pubDate: new Date(item.date).toUTCString(),
      guid: item.id,
    }))
  );
  const feed = await generateRss({ entries });

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=2419200',
    },
  });
};

async function generateRss({
  entries = [],
}: {
  entries: RssEntry[];
}): Promise<string> {
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
        <title><![CDATA[${entry.title}]]></title>
        <description><![CDATA[${entry.description}]]></description>
        <pubDate>${entry.pubDate}</pubDate>
        ${entry.guid ? `<guid isPermaLink="false">${entry.guid}</guid>` : ''}
      </item>`
      )
      .join('')}
  </channel>
</rss>`;
}

async function getRssTitle(markdown: string) {
  const cleanText = String(await remark().use(strip).process(markdown));
  if (cleanText.length > RSS_TITLE_LENGTH) {
    return cleanText.slice(0, RSS_TITLE_LENGTH) + '...';
  }
  return cleanText;
}
