import { useRef, useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';
import type { Asset } from 'contentful';
import {
  ButtonPlay,
  links as buttonPlayLinks,
} from '~/ui/shared/buttons/button-play';
import { getLinks } from '~/utils';

import styles from './catalogue-entry-about.css';
import desktopStyles from './catalogue-entry-about.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...localLinks(), ...buttonPlayLinks()];

interface CatalogueEntryAboutProps {
  title: string;
  description?: Document;
  shortDescription?: string;
  images?: Asset[];
  tracksCount: number;
}

export const CatalogueEntryAbout = ({
  title,
  description,
  shortDescription,
  images,
  tracksCount,
}: CatalogueEntryAboutProps) => {
  const joueleRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  function handlePlayClick() {
    const isPlaying = ($ as any).Jouele.playlist.forEach((pl) => {
      pl.forEach((track: any) => {
        track.pause();
      });
    });

    if (!joueleRef.current) {
      joueleRef.current = ($ as any).Jouele.playlist[0][0].play();
      setIsPlaying(true);
    } else {
      if (joueleRef.current.isPlaying()) {
        joueleRef.current.pause();
        setIsPlaying(false);
      } else {
        joueleRef.current.play();
        setIsPlaying(true);
      }
    }
  }

  return (
    <article className="catalogue-item-about padded-wrap">
      <div className="catalogue-item-about__images">
        {images?.map((image) => (
          <img
            key={image.fields.file.url}
            className="catalogue-item-about__image"
            alt={image.fields.title || title}
            src={image.fields.file.url}
          />
        ))}
      </div>
      {shortDescription && (
        <h3 className="catalogue-item-about__person-desc">
          {shortDescription}
        </h3>
      )}
      <h2 className="catalogue-item-about__name">{title}</h2>
      {description && (
        <main className="catalogue-item-about__text catalogue-item-about__text">
          {documentToReactComponents(description)}
        </main>
      )}
      {/*{tracksCount > 0 && (
        <span className="catalogue-item-about__play-btn">
          <ButtonPlay onClick={handlePlayClick} isPlaying={isPlaying}>
            Воспроизвести
          </ButtonPlay>
        </span>
      )}*/}
    </article>
  );
};
