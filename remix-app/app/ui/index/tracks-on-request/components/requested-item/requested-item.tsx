import { BREAKPOINT_DESKTOP } from '~/config';
import type { RequestedItemDto } from '~/data-fetch';
import { RequestedItemTracks, links as requestedItemTracksLinks } from '../requested-item-tracks';
import styles from './requested-item.css';
import desktopStyles from './requested-item.d.css';

interface RequestedItemProps {
  item: RequestedItemDto;
  width: string;
  onToggleClick: (threshold: number, nextId: string) => void;
}

export const links = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
  ...requestedItemTracksLinks(),
];
export const RequestedItem = ({
  item,
  width,
  onToggleClick,
}: RequestedItemProps) => {
  const title =
    item.title || item.artist + (item.album ? ', ' + item.album : '');

  function handleToggleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const toggleButtonHeight = e.nativeEvent.target
      ? window
          .getComputedStyle(e.nativeEvent.target as Element)
          .getPropertyValue('height')
      : '0';
    const threshold = parseInt(toggleButtonHeight);
    onToggleClick(threshold, item.id);
  }

  return (
    <article className="requested-item">
      <button
        className="requested-item__toggle-visibility"
        type="button"
        onClick={handleToggleClick}
      >
        {title}
      </button>
      <RequestedItemTracks item={item} width={width} />
    </article>
  );
};
