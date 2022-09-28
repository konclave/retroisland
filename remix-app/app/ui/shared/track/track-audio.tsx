import type { RequestedTrackItemDto } from '~/data-fetch';

export const TrackAudio = ({ item }: { item: RequestedTrackItemDto }) => {
  return (
    <>
      <div className="track-wrap">
        <a
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
