import { BREAKPOINT_DESKTOP } from '~/config';
import { CatalogueItem, links as catalogueItemLinks } from '../catalogue-item';
import styles from './catalogue-list.css';
import desktopStyles from './catalogue-list.d.css';

export const links = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP}`,
  },
  ...catalogueItemLinks(),
];

interface CatalogueListProps {
  items: any[];
}

export const CatalogueList = ({ items }: CatalogueListProps) => {
  return (
    <ul className="catalogue">
      {items.map((item) => (
        <li className="catalogue__item" key={item.id}>
          <CatalogueItem item={item} />
        </li>
      ))}
    </ul>
  );
};
