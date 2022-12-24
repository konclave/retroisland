import { Link } from '@remix-run/react';
import { getLinks } from '~/utils';

import styles from './button-load-more.css';
import desktopStyles from './button-load-more.d.css';

export const links = getLinks(styles, desktopStyles);

interface ButtonLoadMoreProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
}

export const ButtonLoadMore = ({
  children,
  onClick,
  href,
}: ButtonLoadMoreProps) => {
  if (!onClick && !href) {
    throw new Error('onClick or href prop must be provided');
  }

  if (onClick) {
    return (
      <button className="button-load-more" onClick={onClick}>
        {children}
      </button>
    );
  }

  if (href) {
    return (
      <Link className="button-load-more" to={href}>
        {children}
      </Link>
    );
  }
  return null;
};
