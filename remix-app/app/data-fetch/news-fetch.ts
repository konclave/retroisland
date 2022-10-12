import type { LoaderFunction } from '@remix-run/node';
import type { INewsItemFields } from '~/types/generated/contentful';
import { client } from './contentful-client';

export interface NewsItemDto {
  id: string;
  text: string;
  link: string;
  date: IsoDate;
}

export interface NewsResponseDto {
  total: number;
  skip: number;
  limit: number;
  items: NewsItemDto[];
}

interface NewsLoaderFabricParams {
  limit?: number;
  page?: number;
}

export function getNewsLoader({
  limit,
  page,
}: NewsLoaderFabricParams = {}): LoaderFunction {
  const newsLoader: LoaderFunction = async (): Promise<NewsResponseDto> => {
    return fetchNews({ limit, page });
  };
  return newsLoader;
}

export async function fetchNews({
  limit = 5,
  page = 0,
}: {
  limit?: number;
  page?: number;
} = {}) {
  const contentType = 'newsItem';
  const data = await client.getEntries<INewsItemFields>({
    limit,
    skip: limit * page,
    content_type: contentType,
  });
  const { total, skip, items } = data;
  return {
    total,
    limit,
    skip,
    items: items
      .map((item) => ({
        id: item.sys.id,
        text: item.fields.text || '',
        link: item.fields.link || '',
        date: item.fields.published || item.sys.createdAt,
      }))
      .sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()),
    // .slice(0, limit || data.items.length)
  };
}
