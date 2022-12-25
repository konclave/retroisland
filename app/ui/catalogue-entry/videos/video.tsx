import { useState, useEffect } from 'react';
import { getLinks } from '~/utils';
import type { VideoDto } from '~/data-fetch';

import styles from './video.css';
import desktopStyles from './video.d.css';

const localLinks = getLinks(styles, desktopStyles);
export const links = () => [...localLinks()];

interface VideoProps {
  video: VideoDto;
}

export const Video = ({ video }: VideoProps) => {
  return (
    <div className="video-item">
      <a
        className="video-item__link"
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
    </div>
  );
};
