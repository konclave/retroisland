import type { TrackEntry } from './track';

export const TrackOk = ({ item }: { item: TrackEntry }) => {
  return (
    <>
      <img
        className="requested-item-tracks-list__icon"
        src="/img/ok.svg"
        height="20px"
        alt={item.title}
      />
      <a href={item.ok} target="_blank" rel="noopener noreferrer nofollow">
        {item.title}
      </a>
    </>
  );
};
