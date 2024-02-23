import { ClientOnly } from 'remix-utils/client-only';
import { getLinks } from '~/utils';
import { TrackAudio } from './track-audio';
import { TrackYoutube } from './track-youtube';
import { TrackOk } from './track-ok';
import type { RequestedTrackItemDto } from '~/data-fetch';

import styles from './track.css';
import desktopStyles from './track.d.css';

export const links = getLinks(styles, desktopStyles);

interface TrackProps {
  item: RequestedTrackItemDto;
}

export const Track = ({ item }: TrackProps) => {
  return (
    <ClientOnly>
      {() => (
        <div className="track">
          {item.link && <TrackAudio item={item} />}
          {item.youtube && <TrackYoutube item={item} />}
          {item.ok && <TrackOk item={item} />}
        </div>
      )}
    </ClientOnly>
  );
};
