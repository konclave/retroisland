import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
import lgStyles from 'lightgallery/css/lightgallery.css';

import { getLinks } from '~/utils';
import styles from './videos.css';
import desktopStyles from './videos.d.css';

const localLinks = getLinks(styles, desktopStyles);
export const links = () => [
  {
    rel: 'stylesheet',
    href: lgStyles,
  },
  ...localLinks(),
];

interface VideosProps {
  entries?: string[];
}

export const Videos = ({ entries }: VideosProps) => {
  if (!entries?.length) {
    return null;
  }
  const ids = entries.map((entry) => entry.split('/').at(-1));
  return (
    <article className="catalogue-item-videos content-section">
      <h2 className="catalogue-item-videos__title section-title">Видео</h2>
      <LightGallery plugins={[lgVideo]}>
        {ids.filter(Boolean).map((id) => (
          <a
            key={id}
            data-lg-size="1280-720"
            data-src={'//www.youtube.com/watch?v=' + id}
            data-poster={
              'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg'
            }
          >
            <img
              width="300"
              height="250"
              className="img-responsive"
              src={'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg'}
            />
          </a>
        ))}
      </LightGallery>
    </article>
  );
};
