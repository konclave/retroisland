import type { LoaderFunction } from '@remix-run/node';
import type { INewsItemFields } from '~/types/generated/contentful';
import { client } from './contentful-client';

export interface NewsItemDto {
  id: string;
  text: string;
  date: IsoDate;
}

export function getNewsLoader({ limit = 0 }): LoaderFunction {
  const newsLoader: LoaderFunction = async (): Promise<NewsItemDto[]> => {
    return fetchNews({ limit });
  };
  return newsLoader;
}

export async function fetchNews({ limit }: { limit: number }) {
  const contentType = 'newsItem';
  const data = await client.getEntries<INewsItemFields>({
    limit,
    content_type: contentType,
  });

  return data.items
    .map((item) => ({
      id: item.sys.id,
      text: item.fields.text || '',
      date: item.fields.published || item.sys.createdAt,
    }))
    .sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit || data.items.length);
}
