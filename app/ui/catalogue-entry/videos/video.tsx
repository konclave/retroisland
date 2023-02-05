import { useState, useEffect } from 'react';
import { getLinks } from '~/utils';
import type { MouseEvent } from 'react';
import type { VideoDto } from '~/data-fetch';

import styles from './video.css';
import desktopStyles from './video.d.css';

const localLinks = getLinks(styles, desktopStyles);
export const links = () => [...localLinks()];

interface VideoProps {
  video: VideoDto;
  onClick?: () => void;
}

export const Video = ({ video, onClick }: VideoProps) => {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    onClick();
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
      { video.title ? <h4 className="video-item__title">{ video.title }</h4> : null }
    </div>
  );
};
