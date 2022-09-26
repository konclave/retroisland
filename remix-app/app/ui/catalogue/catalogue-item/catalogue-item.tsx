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
      <a href={item.link}>
        <h2 className="catalogue-entry__title">{item.title}</h2>
      </a>
    </div>
  );
};
