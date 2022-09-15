export interface TrackEntry {
  title: string;
  link?: string;
  youtube?: string;
  length?: string;
  ok?: string;
}
interface TrackProps {
  item: TrackEntry;
}
export const Track = ({ item }: TrackProps) => {
  return (
    <>
      { item.link && <a
        className="jouele"
        data-hide-timeline-on-pause="true"
        id="jesus-christ-pose"
        href={item.link}
        data-length={item.length}
      >
        {item.title}
      </a> }
      {item.youtube && (
        <>
          <img
            className="requested-item-tracks-list__icon"
            src="/img/youtube.svg"
            height="20px"
            alt={item.title}
          />
          <a
            href={item.youtube}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            {item.title}
          </a>
        </>
      )}
      {item.ok && (
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
      )}
    </>
  );
};
