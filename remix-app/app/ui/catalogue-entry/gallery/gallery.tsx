import type { Asset } from 'contentful';
import { getLinks } from '~/utils';
import styles from './gallery.css';
import desktopStyles from './gallery.d.css';
import fotoramaStyles from './fotorama.css';

if (typeof document !== 'undefined') {
  Promise.all([import('jquery')]).then(([{ default: jQuery }]) => {
    (window as any).jQuery = (window as any).$ = jQuery;
    require('./fotorama');
  });
}

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [
  { rel: 'stylesheet', href: fotoramaStyles },
  ...localLinks(),
];

interface GalleryProps {
  images?: Asset[];
  title?: string;
}

export const Gallery = ({ images, title }: GalleryProps) => {
  if (!images?.length) {
    return null;
  }

  return (
    <article className="catalogue-gallery padded-wrap">
      <h2 className="section-title">Галерея исполнителя</h2>
      <div
        className="fotorama"
        data-allowfullscreen="native"
        data-width="100%"
        data-ratio="4/3"
        data-nav="thumbs"
      >
        {images.map((image) => (
          <img
            src={image.fields.file.url}
            alt={image.fields.title || title}
            key={image.fields.file.url}
          />
        ))}
      </div>
    </article>
  );
};
