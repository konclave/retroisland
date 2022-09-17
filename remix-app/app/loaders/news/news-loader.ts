import type { LoaderFunction } from '@remix-run/node';
import { CONTENTFUL_ENTRIES_URL } from '~/config';

interface ContentfulNewsItem {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    text: string;
    published: string;
  };
}

interface ContentfulNewsItemsResponse {
  items: ContentfulNewsItem[];
}

export function getNewsLoader({ limit = 0 }): LoaderFunction {
  const newsLoader: LoaderFunction = async (): Promise<NewsItemDto[]> => {
    const contentType = 'newsItem';
    const url = new URL(CONTENTFUL_ENTRIES_URL);
    url.searchParams.append('content_type', contentType);

    const response = await fetch(url);
    const data: ContentfulNewsItemsResponse = await response.json();

    return data.items
      .map((item: ContentfulNewsItem) => ({
        id: item.sys.id,
        text: item.fields.text,
        date: item.fields.published || item.sys.createdAt,
      }))
      .sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit || data.items.length);
  };
  return newsLoader;
}
