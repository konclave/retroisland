import { fetchNews, fetchRequested } from '~/data-fetch';
import type { LoaderFunction } from '@remix-run/node';
import type { NewsItemDto, RequestedItemDto } from '~/data-fetch';

export interface IndexLoaderData {
  news: NewsItemDto[],
  requested: RequestedItemDto[],
}

export const indexLoader: LoaderFunction = async () => {
  const [news, requested] = await Promise.all([
    await fetchNews({ limit: 5 }),
    await fetchRequested(),
  ]);

  return {
    news,
    requested,
  };
};
