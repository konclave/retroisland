import type { Asset } from 'contentful';
import { getLinks } from '~/utils';
import { Gallery, links as galleryLinks } from '~/ui/shared/gallery';

import styles from './catalogue-gallery.css';

const localLinks = getLinks(styles);

export const links = [...galleryLinks(), ...localLinks()];

interface CatalogueGalleryProps {
  images?: Asset[];
  title?: string;
}

export const CatalogueGallery = ({ images, title }: CatalogueGalleryProps) => {
  if (!images?.length) {
    return null;
  }

  return (
    <article className="catalogue-gallery padded-wrap">
      <h2 className="section-title">Галерея исполнителя</h2>
      <Gallery images={images} defaultTitle={title} />
    </article>
  );
};
