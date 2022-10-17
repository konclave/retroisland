import { fetchNews, fetchRequested } from '~/data-fetch';
import { client } from '~/data-fetch/contentful-client';

import type { LoaderFunction } from '@remix-run/node';
import type { NewsItemDto, RequestedItemDto } from '~/data-fetch';

export interface IndexLoaderData {
  news: NewsItemDto[];
  requested: RequestedItemDto[];
  pageContent: any;
}

export const indexLoader: LoaderFunction = async () => {
  const [news, requested, content] = await Promise.all([
    await fetchNews(),
    await fetchRequested(),
    await client.getEntry('5JMor9jC2OuNal1Eb5kfhy'),
  ]);

  return {
    news: news.items,
    requested,
    content,
  };
};
