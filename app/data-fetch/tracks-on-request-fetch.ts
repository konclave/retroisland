import type {
  IRequestedItemFields,
  IRequestedTrackFields,
  IRequestedTrack,
} from '~/types/generated/contentful';
import { client } from './contentful-client';
import { attachStorageUrl } from '~/utils';

import type { Entry } from 'contentful';

export interface RequestedItemDto {
  id: string;
  artist: string;
  album?: string;
  title?: string;
  tracks: RequestedTrackItemDto[];
}

export type RequestedTrackItemDto = IRequestedTrackFields & {
  id: string;
};

export async function fetchRequested(): Promise<RequestedItemDto[]> {
  const data = await client.getEntries<IRequestedItemFields>({
    content_type: 'requestedItem',
    select: 'sys.id,sys.createdAt,fields',
    order: 'sys.createdAt',
    include: 2,
  });

  return data.items.map(mapRequestedItemDto);
}

function mapRequestedItemDto(
  item: Entry<IRequestedItemFields>
): RequestedItemDto {
  return {
    id: item.sys.id,
    artist: item.fields.artist || '',
    album: item.fields.album,
    title: item.fields.title,
    tracks: item.fields.tracks?.filter((track) => track.fields).map(mapTrackToDto) || [],
  };
}

export function mapTrackToDto(track: IRequestedTrack): RequestedTrackItemDto {
  return {
    id: track.sys.id,
    title: track.fields.title,
    link: attachStorageUrl(track.fields.link),
    length: track.fields.length || '',
    youtube: track.fields.youtube || '',
    ok: track.fields.ok || '',
    shortDescription: track.fields.shortDescription || '',
  };
}
