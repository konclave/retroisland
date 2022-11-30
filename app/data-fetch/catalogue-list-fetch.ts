import { mapTrackToDto } from './tracks-on-request-fetch';
import { client } from './contentful-client';

import type { Entry } from 'contentful';
import type { ICatalogueEntryFields } from '~/types/generated/contentful';
import type { Document } from '@contentful/rich-text-types';
import type { CatalogueEntryDto } from './catalogue-entry-fetch';

export type CatalogueListEntryDto = Pick<
  CatalogueEntryDto,
  'id' | 'createdAt' | 'slug' | 'title'
>;

export async function fetchCatalogueList(): Promise<CatalogueListEntryDto[]> {
  const data = await client.getEntries<ICatalogueEntryFields>({
    content_type: 'catalogueEntry',
    select: 'sys.id,sys.createdAt,fields.slug,fields.title',
    include: 2,
    order: 'sys.createdAt',
  });

  return data.items.map(mapToDto);
}

const mapToDto = (
  item: Entry<ICatalogueEntryFields>
): CatalogueListEntryDto => ({
  id: item.sys.id,
  createdAt: item.sys.createdAt,
  title: item.fields.title || '',
  slug: item.fields.slug,
});
