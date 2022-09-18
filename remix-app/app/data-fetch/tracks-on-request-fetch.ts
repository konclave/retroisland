import type { IRequestedItemFields } from '~/types/generated/contentful';
import { client } from './contentful-client';

export interface RequestedItemDto {
  id: string;
  artist: string;
  album?: string;
  title?: string;
  tracks: RequestedTrackItemDto[];
}

export interface RequestedTrackItemDto {
  id: string;
  title: string;
  length?: string;
  link?: string;
  youtube?: string;
  ok?: string;
}

export async function fetchRequested() {
  const data = await client.getEntries<IRequestedItemFields>({
    content_type: 'requestedItem',
    select: 'sys.id,sys.createdAt,fields',
  });

  return data.items
    .sort(
      (a, z) =>
        new Date(z.sys.createdAt).getTime() -
        new Date(a.sys.createdAt).getTime()
    )
    .map((item) => ({
      id: item.sys.id,
      artist: item.fields.artist,
      album: item.fields.album,
      title: item.fields.title,
      tracks: item.fields.tracks?.map((track) => ({
        id: track.sys.id,
        title: track.fields.title,
        link: track.fields.link || '',
        length: track.fields.length || '',
        youtube: track.fields.youtube || '',
        ok: track.fields.ok || '',
      })),
    }));
}
