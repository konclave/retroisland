import { useLayoutEffect, useRef } from 'react';
import type { RequestedTrackItemDto } from '~/data-fetch';
import { DownloadLink } from './download-link';

export const TrackAudio = ({ item }: { item: RequestedTrackItemDto }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  useLayoutEffect(() => {
    if (
      typeof document !== 'undefined' &&
      ref.current &&
      (window as any).jQuery &&
      (window as any).jQuery(ref.current).jouele
    ) {
      (window as any).jQuery(ref.current).jouele();
    }
  }, []);

  return (
    <>
      <div className="track-wrap">
        <a
          ref={ref}
          className="jouele"
          data-hide-timeline-on-pause="true"
          id={item.id}
          href={item.link}
          data-length={item.length}
        >
          {item.title}
        </a>
      </div>
      <small className="track__description">
        {item.shortDescription || 'Скачать композицию:'}{' '}
        <DownloadLink url={item.link} title={item.title} />
      </small>
    </>
  );
};
