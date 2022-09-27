import { Link } from '@remix-run/react';
import { BREAKPOINT_DESKTOP } from '~/config';
import styles from './catalogue-item.css';
import desktopStyles from './catalogue-item.d.css';

export const links = () => [
  { rel: 'stylesheet', href: links },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
];

interface CatalogueItemProps {
  item: any;
}

export const CatalogueItem = ({ item }: CatalogueItemProps) => {
  return (
    <div className="catalogue-entry">
      <Link to={item.slug}>
        <h2 className="catalogue-entry__title">{item.title}</h2>
      </Link>
    </div>
  );
};
