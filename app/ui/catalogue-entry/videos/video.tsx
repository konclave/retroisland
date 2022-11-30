import { useState, useEffect } from 'react';

import type { VideoDto } from '~/data-fetch';

interface VideoProps {
  video: VideoDto;
}

export const Video = ({ video }: VideoProps) => {
  return (
    <div className="video-item">
      <a href={video.url} target="_blank" rel="noopener noreferrer nofollow">
        <img src={video.thumbUrl} alt={video.title || ''} />
      </a>
    </div>
  );
};
