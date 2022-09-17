import { TrackAudio } from './track-audio';
import { TrackYoutube } from './track-youtube';
import { TrackOk } from './track-ok';

export interface TrackEntry {
  title: string;
  link?: string;
  youtube?: string;
  length?: string;
  ok?: string;
}
interface TrackProps {
  item: TrackEntry;
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
