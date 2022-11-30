import { getLinks } from '~/utils';
import { Video } from './video';
import styles from './videos.css';
import desktopStyles from './videos.d.css';

const localLinks = getLinks(styles, desktopStyles);
export const links = () => [...localLinks()];

interface VideosProps {
  entries?: string[];
}

export const Videos = ({ entries }: VideosProps) => {
  console.log(entries);
  if (!entries?.length) {
    return null;
  }

  return (
    <article className="catalogue-item-videos content-section">
      <h2 className="catalogue-item-videos__title section-title">Видео</h2>
      {entries.map((video) => (
        <Video video={video} key={video.url} />
      ))}
    </article>
  );
};
