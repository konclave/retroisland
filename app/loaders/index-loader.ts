import { fetchCatalogueList, fetchNews, fetchRequested } from '~/data-fetch';
import { client } from '~/data-fetch/contentful-client';
import type {
  NewsItemDto,
  RequestedItemDto,
  CatalogueEntryDto,
} from '~/data-fetch';

import type { LoaderFunction } from '@remix-run/node';
import type { ITextPageFields } from '~/types/generated/contentful';

export interface IndexLoaderData {
  news: NewsItemDto[];
  requested: RequestedItemDto[];
  content: ITextPageFields;
  catalogueItems: CatalogueEntryDto[];
}

export const indexLoader: LoaderFunction =
  async (): Promise<IndexLoaderData> => {
    const [news, requested, content, catalogueItems] = await Promise.all([
      await fetchNews(),
      await fetchRequested(),
      await client.getEntry<ITextPageFields>('5JMor9jC2OuNal1Eb5kfhy'),
      await fetchCatalogueList(),
    ]);

    content.fields.links =
      content.fields.links?.filter((link) => link.fields) ?? [];
    return {
      news: news.items,
      requested,
      content: content.fields,
      catalogueItems,
    };
  };
