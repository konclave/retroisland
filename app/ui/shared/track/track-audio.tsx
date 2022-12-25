import { useEffect, useRef } from 'react';
import type { RequestedTrackItemDto } from '~/data-fetch';

export const TrackAudio = ({ item }: { item: RequestedTrackItemDto }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  useEffect(() => {
    if (
      typeof document !== 'undefined' &&
      ref.current &&
      (window as any).jQuery &&
      (window as any).jQuery(ref.current).jouele
    ) {
      (window as any).jQuery(ref.current).jouele();
    }
  }, [ref.current]);

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

      {item.shortDescription && (
        <small className="track__description">{item.shortDescription}</small>
      )}
    </>
  );
};
