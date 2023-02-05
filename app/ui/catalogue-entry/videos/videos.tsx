import Lightbox from 'yet-another-react-lightbox';

import { getLinks } from '~/utils';
import { useState } from 'react';
import { Video, links as videoLinks } from './video';
import { VideoPlayer } from './video-player'

import type { VideoDto } from '~/data-fetch';
import lightboxStyles from "yet-another-react-lightbox/styles.css";

import styles from './videos.css';
import desktopStyles from './videos.d.css';

const localLinks = getLinks(styles, desktopStyles);
export const links = () => [{ rel: 'stylesheet', href: lightboxStyles }, ...videoLinks(), ...localLinks()];

interface VideosProps {
  entries?: VideoDto[];
}

export const Videos = ({ entries }: VideosProps) => {
  const [lightboxController, setLightboxController] = useState({
    open: false,
    index: 0,
  });

  function openPlayer(slide: number) {
    return () => {
      setLightboxController({
        open: true,
        slide,      
      });
    }
  }

  if (!entries?.length) {
    return null;
  }

  function renderVideo(video) {
    return <VideoPlayer html={video.html} url={video.url} />
  }

  function closeLightbox() {
    setLightboxController({ open: false, slide: 0 });
  }

  return (
    <article className="catalogue-item-videos">
      <h2 className="catalogue-item-videos__title section-title">Видео</h2>
      <ul className="videos-list">
        {entries.map((video, idx) => (
          <li className="videos-list__item" key={video.url}>
            <Video video={video} onClick={openPlayer(idx)} />
          </li>
        ))}
      </ul>
      <Lightbox
        open={lightboxController.open}
        close={closeLightbox}
        slides={entries}
        render={{ slide: renderVideo }}
        index={lightboxController.slide}
      />
    </article>
  );
};
