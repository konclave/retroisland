import { getLinks } from '~/utils';

import styles from './button-load-more.css';
import desktopStyles from './button-load-more.d.css';

export const links = getLinks(styles, desktopStyles);

interface ButtonLoadMoreProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonLoadMore = ({ children, onClick }) => {
  return (
    <button className="button-load-more" onClick={onClick}>
      {children}
    </button>
  );
};
