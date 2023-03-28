import { useState } from 'react';
import { getLinks } from '~/utils';
import type { MouseEvent } from 'react';
import type { VideoDto } from '~/data-fetch';

import styles from './video.css';
import desktopStyles from './video.d.css';
import type { CustomSlide, Slide } from 'yet-another-react-lightbox';
import Lightbox from 'yet-another-react-lightbox';
import {
  VideoPlayer,
  links as videoPlayerLinks,
} from '~/ui/catalogue-entry/videos/video-player';

const localLinks = getLinks(styles, desktopStyles);
export const links = () => [...videoPlayerLinks(), ...localLinks()];

interface VideoProps {
  video: VideoDto;
  onClick?: () => void;
}

export const Video = ({ video, onClick }: VideoProps) => {
  const [open, setOpen] = useState(false);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setOpen(true);
    if (onClick) {
      onClick();
    }
  }

  function closeLightbox() {
    setOpen(false);
  }

  function isCustomSlide(slide: Slide): slide is CustomSlide {
    return slide.type === 'custom-slide';
  }

  return (
    <div className="video-item">
      <a
        className="video-item__link"
        onClick={handleClick}
        href={video.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <img
          className="video-item__thumbnail"
          src={video.thumbUrl}
          alt={video.title || ''}
        />
        <span className="video-item__overlay"></span>
      </a>
      {video.title ? (
        <h4 className="video-item__title">{video.title}</h4>
      ) : null}
      <Lightbox
        open={open}
        close={closeLightbox}
        carousel={{
          finite: true,
        }}
        slides={[{ type: 'custom-slide' as const, ...video }]}
        render={{
          slide: ({ slide }) =>
            isCustomSlide(slide) ? <VideoPlayer url={video.url} /> : undefined,
        }}
      />
    </div>
  );
};
