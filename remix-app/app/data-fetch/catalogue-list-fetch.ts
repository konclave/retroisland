import type {
  ICatalogueEntryFields,
  IAlbum,
} from '~/types/generated/contentful';
import type { Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

import { client } from './contentful-client';

export interface CatalogueEntryDto {
  id: string;
  title: string;
  slug: string;
  images?: Asset[];
  shortDescription?: string;
  description?: Document;
  albums?: IAlbum[] | undefined;
  acknowledgements?: string[];
}

export async function fetchCatalogueList(): Promise<CatalogueEntryDto[]> {
  const data = await client.getEntries<ICatalogueEntryFields>({
    content_type: 'catalogueEntry',
    select: 'sys.id,fields',
  });

  return data.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title || '',
    slug: item.fields.slug,
    // images:
    shortDescription: item.fields.shortDescription,
    description: item.fields.description,
    albums: item.fields.albums,
    acknowledgements: item.fields.acknowledgements,
    // tracks: item.fields.tracks?.map((track) => ({
    //   id: track.sys.id,
    //   title: track.fields.title,
    //   link: track.fields.link || '',
    //   length: track.fields.length || '',
    //   youtube: track.fields.youtube || '',
    //   ok: track.fields.ok || '',
    // })),
  }));
}
