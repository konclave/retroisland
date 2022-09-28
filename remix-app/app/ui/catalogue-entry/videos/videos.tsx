import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { getLinks } from '~/utils';
import styles from './videos.css';
import desktopStyles from './videos.d.css';

export const links = getLinks(styles, desktopStyles);

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
      <ul className="videos-list">
        {ids.map((id) =>
          id ? (
            <li className="videos-list__item" key={id}>
              <LiteYouTubeEmbed id={id} title="" />
            </li>
          ) : null
        )}
      </ul>
    </article>
  );
};
