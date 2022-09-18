import { TrackAudio } from './track-audio';
import { TrackYoutube } from './track-youtube';
import { TrackOk } from './track-ok';
import type { RequestedTrackItemDto } from '~/data-fetch';

interface TrackProps {
  item: RequestedTrackItemDto;
}
export const Track = ({ item }: TrackProps) => {
  return (
    <>
      {item.link && <TrackAudio item={item} />}
      {item.youtube && <TrackYoutube item={item} />}
      {item.ok && <TrackOk item={item} />}
    </>
  );
};
