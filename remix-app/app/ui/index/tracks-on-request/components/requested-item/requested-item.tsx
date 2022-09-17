import { Track } from '../track';
import type { TrackEntry } from '../track';

interface Requested {
  title?: string;
  artist: string;
  album?: string;
  tracks: TrackEntry[];
}

interface RequestedItemProps {
  item: Requested;
}

export const RequestedItem = ({ item }: RequestedItemProps) => {
  const title = ''; // {% if entry.data.title %}{{ entry.data.title }}{% else %}{{ entry.data.artist }}{% if entry.data.album %}, {{ entry.data.album }}{% endif %}{% endif %}
  return (
    <article className="requested-item">
      <button className="requested-item__toggle-visibility" type="button">
        {title}
      </button>
      <div className="requested-item-tracks">
        <h2 className="requested-item-tracks__title">Концерт по заявкам</h2>
        <h3 className="requested-item-tracks__author">{item.artist}</h3>
        {item.album && (
          <h4 className="requested-item-tracks__album">{item.album}</h4>
        )}
        <div className="requested-item-tracks__list-container">
          <ol className="requested-item-tracks-list jouele-playlist">
            {item.tracks.map((track) => (
              <li className="requested-item-tracks-list__item" key={track.link}>
                <Track item={track} />
              </li>
            ))}
          </ol>
        </div>
        {/* <div className="requested-item-tracks__buttons">
                        <button className="requested-item-tracks__button requested-item-tracks__button_expand" type="button">Показать весь плейлист</button>
                        <button className="requested-item-tracks__button requested-item-tracks__button_collapse" type="button">Свернуть</button>
                    </div>  */}
      </div>
    </article>
  );
};
