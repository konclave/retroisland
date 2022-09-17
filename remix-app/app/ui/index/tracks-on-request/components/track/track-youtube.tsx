import type { TrackEntry } from './track';

export const TrackYoutube = ({ item }: { item: TrackEntry }) => {
  return (
    <>
      <img
        className="requested-item-tracks-list__icon"
        src="/img/youtube.svg"
        height="20px"
        alt={item.title}
      />
      <a href={item.youtube} target="_blank" rel="noopener noreferrer nofollow">
        {item.title}
      </a>
    </>
  );
};
