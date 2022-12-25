import * as cheerio from 'cheerio';
import axios from 'axios';

import { client } from './contentful-client';
import type {
  ICatalogueEntryFields,
  IAlbumFields,
  IAlbum,
  IOuterLinkFields,
  IOuterLink,
  IVideo,
  IVideoFields,
} from '~/types/generated/contentful';
import { mapTrackToDto } from './tracks-on-request-fetch';
import type { Asset, Entry } from 'contentful';
import type { RequestedTrackItemDto } from './tracks-on-request-fetch';

export interface VideoDto {
  url: string;
  thumbUrl: string;
  title?: string;
}

export type AlbumDto = Omit<IAlbumFields, 'tracks'> & {
  id: string;
  tracks?: RequestedTrackItemDto[];
};

export type LinkDto = IOuterLinkFields & {
  id: string;
};

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
  acknowledgementText?: string;
  videos?: (VideoDto | null)[];
  links?: LinkDto[];
}

export async function fetchCatalogueEntry(
  slug: string
): Promise<CatalogueEntryDto | null> {
  const response = await client.getEntries<ICatalogueEntryFields>({
    content_type: 'catalogueEntry',
    'fields.slug': slug,
    select: 'sys.id,fields',
    include: 2,
  });

  if (response.items.length === 0) {
    return null;
  }

  return await mapToDto(response.items[0]);
}

const mapToDto = async (
  item: Entry<ICatalogueEntryFields>
): Promise<CatalogueEntryDto> => {
  const videos = item.fields.videos
    ? await Promise.all(item.fields.videos.map(mapVideo))
    : [];

  return {
    id: item.sys.id,
    createdAt: item.sys.createdAt,
    title: item.fields.title || '',
    slug: item.fields.slug,
    images: item.fields.images,
    shortDescription: item.fields.shortDescription,
    description: item.fields.description,
    albums: item.fields.albums?.map(mapAlbumToDto),
    acknowledgements: item.fields.acknowledgements,
    acknowledgementText: item.fields.acknowledgementText,
    videos,
    links: item.fields.links?.map(mapOuterLinkToDto),
  };
};

function mapAlbumToDto(album: IAlbum): AlbumDto {
  return {
    id: album.sys.id,
    ...album.fields,
    tracks: album.fields.tracks?.map(mapTrackToDto),
  };
}

function mapOuterLinkToDto(outerLink: IOuterLink): LinkDto {
  const { link = '', title, description } = outerLink.fields;
  return {
    id: outerLink.sys.id,
    link: /^http?s:\/\//.test(link) ? link : process.env['FILE_STORAGE'] + link,
    title,
    description,
  };
}

async function mapVideo(video: IVideo): Promise<VideoDto | null> {
  const { url, thumbnail, title } = video.fields;

  if (thumbnail) {
    return {
      url,
      thumbUrl: thumbnail.fields.file.url,
      title,
    };
  }

  if (/https?:\/\/ok\.ru/.test(url)) {
    const id = url.split('/').at(-1);
    const response = await fetch('https://m.ok.ru/live/' + id);
    const page = await response.text();
    const $ = cheerio.load(page);
    const thumbUrl = $('img.vdo.thumb')?.[0]?.attribs.src || '';
    return {
      url,
      thumbUrl,
      title,
    };
  }

  if (/youtu\.be/.test(url) || /youtube.com/.test(url)) {
    const id = url.split('/').at(-1);
    const thumbUrl = `https://i3.ytimg.com/vi/${id}/hqdefault.jpg`;
    return {
      url,
      thumbUrl,
      title,
    };
  }

  return null;
}
