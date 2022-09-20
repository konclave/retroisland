import { BREAKPOINT_DESKTOP } from '~/config';
import type { RequestedItemDto } from '~/data-fetch';
import { Track } from '../track';
import styles from './requested-item-track-list.css';
import desktopStyles from './requested-item-track-list.d.css';

interface RequestedItemTrackListProps {
  item: RequestedItemDto;
}

export const links = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
];

export const RequestedItemTrackList = ({
  item,
}: RequestedItemTrackListProps) => {
  return (
    <ol className="requested-item-tracks-list jouele-playlist">
      {item.tracks?.map((track) => (
        <li className="requested-item-tracks-list__item" key={track.id}>
          <Track item={track} />
        </li>
      ))}
    </ol>
  );
};
