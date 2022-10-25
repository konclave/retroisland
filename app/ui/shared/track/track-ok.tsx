import type { RequestedTrackItemDto } from '~/data-fetch';

export const TrackOk = ({ item }: { item: RequestedTrackItemDto }) => {
  return (
    <div className="track-wrap">
      <img
        className="track__icon"
        src="/img/ok.svg"
        height="20px"
        alt={item.title}
      />
      <a href={item.ok} target="_blank" rel="noopener noreferrer nofollow">
        {item.title}
      </a>
    </div>
  );
};
