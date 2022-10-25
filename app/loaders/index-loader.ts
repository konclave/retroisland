import { fetchNews, fetchRequested } from '~/data-fetch';
import { client } from '~/data-fetch/contentful-client';

import type { LoaderFunction } from '@remix-run/deno';
import type {
  NewsItemDto,
  RequestedItemDto,
  NewsResponseDto,
} from '~/data-fetch';
import type { ITextPageFields } from '~/types/generated/contentful';

export interface IndexLoaderData {
  news: NewsItemDto[];
  requested: RequestedItemDto[];
  content: ITextPageFields;
}

export const indexLoader: LoaderFunction =
  async (): Promise<IndexLoaderData> => {
    const [news, requested, content] = await Promise.all([
      await fetchNews(),
      await fetchRequested(),
      await client.getEntry<ITextPageFields>('5JMor9jC2OuNal1Eb5kfhy'),
    ]);

    return {
      news: news.items,
      requested,
      content: content.fields,
    };
  };
