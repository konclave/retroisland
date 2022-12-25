import { getLinks } from '~/utils';
import { CatalogueItem, links as catalogueItemLinks } from '../catalogue-item';
import type { CatalogueListEntryDto } from '~/data-fetch';
import styles from './catalogue-list.css';
import desktopStyles from './catalogue-list.d.css';
import tabletStyles from './catalogue-list.tablet.css';

const localLinks = getLinks(styles, desktopStyles, tabletStyles);

export const links = () => [...localLinks(), ...catalogueItemLinks()];

interface CatalogueListProps {
  items: CatalogueListEntryDto[];
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
