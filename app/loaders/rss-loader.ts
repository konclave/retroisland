import { fetchNews } from '~/data-fetch';
import { marked } from 'marked';

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
  return news.items.map((item) => ({
    title: marked.parse(item.text),
    link: 'https://retroisland.net/news-archive',
    description: item.text,
    pubDate: new Date(item.date).toUTCString(),
    guid: item.id,
  })) as RssEntry[];
};
