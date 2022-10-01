import type {
  ICatalogueEntryFields,
  IAlbumFields,
  IAlbum,
  IOuterLinkFields,
  IOuterLink,
} from '~/types/generated/contentful';
import type { Asset, Entry } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import { mapTrackToDto } from './tracks-on-request-fetch';
import type { RequestedTrackItemDto } from './tracks-on-request-fetch';

import { client } from './contentful-client';

export interface CatalogueEntryDto {
  id: string;
  createdAt: IsoDate;
  title: string;
  slug: string;
  images?: Asset[];
  shortDescription?: string;
  description?: Document;
  albums?: AlbumDto[] | undefined;
  acknowledgements?: string[];
  videos?: string[];
  links?: LinkDto[];
}

export type AlbumDto = Omit<IAlbumFields, 'tracks'> & {
  id: string;
  tracks?: RequestedTrackItemDto[];
};

export type LinkDto = IOuterLinkFields & {
  id: string;
};

export async function fetchCatalogueList(): Promise<CatalogueEntryDto[]> {
  const data = await client.getEntries<ICatalogueEntryFields>({
    content_type: 'catalogueEntry',
    select: 'sys.id,sys.createdAt,fields',
    include: 2,
    order: 'sys.createdAt',
  });

  return data.items.map(mapToDto);
}

export const mapToDto = (
  item: Entry<ICatalogueEntryFields>
): CatalogueEntryDto => ({
  id: item.sys.id,
  createdAt: item.sys.createdAt,
  title: item.fields.title || '',
  slug: item.fields.slug,
  images: item.fields.images,
  shortDescription: item.fields.shortDescription,
  description: item.fields.description,
  albums: item.fields.albums?.map(mapAlbumToDto),
  acknowledgements: item.fields.acknowledgements,
  videos: item.fields.videos,
  links: item.fields.links?.map(mapOuterLinkToDto),
});

function mapAlbumToDto(album: IAlbum): AlbumDto {
  return {
    id: album.sys.id,
    ...album.fields,
    tracks: album.fields.tracks?.map(mapTrackToDto),
  };
}

function mapOuterLinkToDto(link: IOuterLink): LinkDto {
  return {
    id: link.sys.id,
    ...link.fields,
  };
}
