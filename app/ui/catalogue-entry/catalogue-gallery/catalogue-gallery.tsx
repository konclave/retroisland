import type { Asset } from 'contentful';
import { getLinks } from '~/utils';
import AliceCarousel from 'react-alice-carousel';

import { renderCatalogueGalleryButton } from './catalogue-gallery-button';

import galleryStyles from 'react-alice-carousel/lib/alice-carousel.css';
import styles from './catalogue-gallery.css';

const localLinks = getLinks(styles);

export const links = () => [
  { rel: 'stylesheet', href: galleryStyles },
  ...localLinks(),
];

interface CatalogueGalleryProps {
  images?: Asset[];
  title?: string;
}

export const CatalogueGallery = ({ images, title }: CatalogueGalleryProps) => {
  if (!images?.length) {
    return null;
  }

  return (
    <article className="catalogue-gallery">
      <h2 className="section-title catalogue-gallery__title">
        Галерея исполнителя
      </h2>
      <AliceCarousel
        ssrSilentMode={true}
        disableDotsControls={true}
        autoWidth
        mouseTracking
        renderPrevButton={renderCatalogueGalleryButton({ type: 'prev' })}
        renderNextButton={renderCatalogueGalleryButton({ type: 'next' })}
        items={images.map((image) => (
          <span className="catalogue-gallery__item">
            <img
              className="catalogue-gallery__image"
              src={image.fields.file.url}
              alt={image.fields.title || title}
            />
          </span>
        ))}
      />
    </article>
  );
};
