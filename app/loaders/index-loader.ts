import { fetchCatalogueList, fetchNews, fetchRequested } from '~/data-fetch';
import { client } from '~/data-fetch/contentful-client';
import type {
  NewsItemDto,
  RequestedItemDto,
  CatalogueEntryDto,
} from '~/data-fetch';

import type { LoaderFunction } from '@remix-run/node';
import type { IOuterLink, ITextPageFields } from '~/types/generated/contentful';
import type { Entry } from 'contentful';

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
      await client.getEntry('5JMor9jC2OuNal1Eb5kfhy'),
      await fetchCatalogueList(),
    ]);

    content.fields.links =
      content.fields.links?.filter((link: Entry<IOuterLink>) => link.fields) ??
      [];
    return {
      news: news.items,
      requested,
      content: content.fields,
      catalogueItems,
    };
  };
