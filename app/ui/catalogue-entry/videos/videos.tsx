import { getLinks } from '~/utils';
import { Video, links as videoLinks } from './video';

import type { VideoDto } from '~/data-fetch';
import lightboxStyles from 'yet-another-react-lightbox/styles.css';

import styles from './videos.css';
import desktopStyles from './videos.d.css';

const localLinks = getLinks(styles, desktopStyles);
export const links = () => [
  { rel: 'stylesheet', href: lightboxStyles },
  ...videoLinks(),
  ...localLinks(),
];

interface VideosProps {
  entries?: VideoDto[];
}

export const Videos = ({ entries }: VideosProps) => {
  if (!entries?.length) {
    return null;
  }

  return (
    <article className="catalogue-item-videos">
      <h2 className="catalogue-item-videos__title section-title">Видео</h2>
      <ul className="videos-list">
        {entries.map((video, idx) => (
          <li className="videos-list__item" key={video.url}>
            <Video video={video} />
          </li>
        ))}
      </ul>
    </article>
  );
};
