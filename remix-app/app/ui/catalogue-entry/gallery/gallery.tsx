import type { Asset } from 'contentful';
import { getLinks } from '~/utils';
import styles from './gallery.css';

export const links = getLinks(styles);

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
          <img src={image.fields.file.url} alt={image.fields.title || title} />
        ))}
      </div>
    </article>
  );
};
