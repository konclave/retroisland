import { BREAKPOINT_DESKTOP } from '~/config';
import type { RequestedTrackItemDto } from '~/data-fetch';
import { Track, links as trackLinks } from '../track';
import { getLinks } from '~/utils';
import cx from 'classnames';

import styles from './track-list.css';
import desktopStyles from './track-list.d.css';

import joueleStyles from 'ilyabirman-jouele/dist/jouele.min.css';
import joueleLocalStyles from './jouele.css';
import joueleLocalDesktopStyles from './jouele.d.css';

interface TrackListProps {
  tracks?: RequestedTrackItemDto[];
  catalogue?: boolean;
}

if (typeof document !== 'undefined') {
  Promise.all([import('howler'), import('jquery')]).then(
    ([
      {
        default: { Howl },
      },
      { default: jQuery },
    ]) => {
      (window as any).Howl = Howl;
      (window as any).jQuery = (window as any).$ = jQuery;
      import('ilyabirman-jouele');
    }
  );
}

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [
  { rel: 'stylesheet', href: joueleStyles },
  { rel: 'stylesheet', href: joueleLocalStyles },

  {
    rel: 'stylesheet',
    href: joueleLocalDesktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
  ...localLinks(),
  ...trackLinks(),
];

export const TrackList = ({ tracks, catalogue }: TrackListProps) => {
  if (!tracks?.length) {
    return null;
  }
  return (
    <ol
      className={cx('track-list jouele-playlist', {
        'catalogue-album__tracks': catalogue,
      })}
    >
      {tracks?.map((track) => (
        <li className="track-list__item" key={track.id}>
          <Track item={track} />
        </li>
      ))}
    </ol>
  );
};
