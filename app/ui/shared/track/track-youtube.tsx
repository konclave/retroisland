import type { RequestedTrackItemDto } from '~/data-fetch';

export const TrackYoutube = ({ item }: { item: RequestedTrackItemDto }) => {
  return (
    <div className="track-wrap">
      <img
        className="track__icon"
        src="/img/youtube.svg"
        height="20px"
        alt={item.title}
      />
      <a href={item.youtube} target="_blank" rel="noopener noreferrer nofollow">
        {item.title}
      </a>
    </div>
  );
};
