import type { TrackEntry } from './track';

export const TrackAudio = ({ item }: { item: TrackEntry }) => {
  return (
    <a
      className="jouele"
      data-hide-timeline-on-pause="true"
      id="jesus-christ-pose"
      href={item.link}
      data-length={item.length}
    >
      {item.title}
    </a>
  );
};
