import { useLayoutEffect, useRef } from 'react';
import { getLinks } from '~/utils';

import type { Asset } from 'contentful';

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
  defaultTitle?: string;
  withCaption?: boolean;
}

export const Gallery = ({
  images,
  defaultTitle,
  withCaption,
}: GalleryProps) => {
  const fotorama = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (fotorama.current === null) {
      return;
    }

    ($(fotorama.current) as any).fotorama();
  }, []);

  if (!images?.length) {
    return null;
  }

  return (
    <div
      ref={fotorama}
      className="fotorama"
      data-allowfullscreen="native"
      data-width="100%"
      data-ratio="4/3"
      data-nav="thumbs"
      data-fit="cover"
    >
      {images.map((image) => (
        <img
          src={image.fields.file.url}
          alt={image.fields.title || defaultTitle || ''}
          key={image.fields.file.url}
          data-caption={withCaption ? image.fields.title : ''}
        />
      ))}
    </div>
  );
};
