import { getLinks } from '~/utils';
import { TrackList, links as trackListLinks } from '~/ui/shared/track-list';

import type { AlbumDto } from '~/data-fetch';

import styles from './albums.css';
import desktopStyles from './albums.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...localLinks(), ...trackListLinks()];

interface AlbumsProps {
  entries?: AlbumDto[];
}

export const Albums = ({ entries }: AlbumsProps) => {
  if (!entries?.length) {
    return null;
  }
  return (
    <article className="catalogue-tracks">
      <h2 className="catalogue-tracks__title section-title">Композиции</h2>
      {entries.map((album) => (
        <div className="catalogue-album" key={album.id}>
          {album.title && (
            <h3 className="catalogue-album__title">{album.title}</h3>
          )}
          {album.subtitle && (
            <h4 className="catalogue-album__subtitle">{album.subtitle}</h4>
          )}
          <TrackList tracks={album.tracks} catalogue={true} />
          {/*<button type="button" className="button-show-more">
            Показать ещё 10
          </button>*/}
        </div>
      ))}
    </article>
  );
};
