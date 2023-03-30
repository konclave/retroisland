import { useLayoutEffect, useRef } from 'react';
import { getLinks } from '~/utils';

import type { Asset } from 'contentful';

import styles from './gallery.css';
import desktopStyles from './gallery.d.css';
import fotoramaStyles from './fotorama.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [
  { rel: 'stylesheet', href: fotoramaStyles },
  ...localLinks(),
];

interface GalleryProps {
  images?: Asset[];
  defaultTitle?: string;
  withCaption?: boolean;
  withNav?: boolean;
}

export const Gallery = ({
  images,
  defaultTitle,
  withCaption,
  withNav,
}: GalleryProps) => {
  const fotorama = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (typeof $ === 'undefined' || fotorama.current === null) {
      return;
    }

    ($(fotorama.current) as any).fotorama({
      allowfullscreen: 'native',
      width: '100%',
      ratio: '4/3',
      nav: 'thumbs',
      fit: 'cover',
      ...(withNav && { arrows: true }),
      thumbheight: 100,
      thumbwidth: 100,
    });
  }, []);

  if (!images?.length) {
    return null;
  }

  return (
    <div ref={fotorama} className="fotorama">
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
