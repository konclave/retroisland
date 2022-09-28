import { getLinks } from '~/utils';
import type { RequestedItemDto } from '~/data-fetch';
import { TrackList, links as trackListLinks } from '~/ui/shared/track-list';
import styles from './requested-item-tracks.css';
import desktopStyles from './requested-item-tracks.d.css';

interface RequestedItemTracksProps {
  item: RequestedItemDto;
  width: string;
}

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...localLinks(), ...trackListLinks()];

export const RequestedItemTracks = ({
  item,
  width,
}: RequestedItemTracksProps) => {
  return (
    <div className="requested-item-tracks" style={{ width }}>
      <h2 className="requested-item-tracks__title">Концерт по заявкам</h2>
      <h3 className="requested-item-tracks__author">{item.artist}</h3>
      {item.album && (
        <h4 className="requested-item-tracks__album">{item.album}</h4>
      )}
      <div className="requested-item-tracks__list-container">
        <TrackList tracks={item.tracks} />
      </div>
      {/* <div className="requested-item-tracks__buttons">
            <button className="requested-item-tracks__button requested-item-tracks__button_expand" type="button">Показать весь плейлист</button>
            <button className="requested-item-tracks__button requested-item-tracks__button_collapse" type="button">Свернуть</button>
        </div>  */}
    </div>
  );
};
