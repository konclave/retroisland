import type { LoaderFunction } from '@remix-run/node';
import type { INewsItem } from '~/types/generated/contentful';
import { client } from './contentful-client';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export interface NewsItemDto {
  id: string;
  text: string;
  html: string;
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
  return async (): Promise<NewsResponseDto> => {
    return fetchNews({ limit, page });
  };
}

export async function fetchNews({
  limit = 5,
  page = 0,
}: {
  limit?: number;
  page?: number;
} = {}): Promise<NewsResponseDto> {
  const contentType = 'newsItem';
  const data = await client.getEntries({
    limit,
    skip: limit * page,
    content_type: contentType,
    order: '-fields.published,-sys.createdAt',
  });
  const { total, skip, items } = data;
  return {
    total,
    limit,
    skip,
    items: await Promise.all(
      items.map(async (item: INewsItem) => ({
        id: item.sys.id,
        text: item.fields.text || '',
        html: String(await remark().use(remarkHtml).process(item.fields.text)),
        link: item.fields.link || '',
        date: item.fields.published || item.sys.createdAt,
      }))
    ),
    // .sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()),
  };
}
