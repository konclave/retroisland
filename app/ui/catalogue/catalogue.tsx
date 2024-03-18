import { useState } from 'react';
import cx from 'classnames';
import type { CatalogueListEntryDto } from '~/data-fetch';
import { CatalogueNotFound } from './catalogue-not-found';

import { CatalogueForm, links as catalogueFromLinks } from './catalogue-form';
import { CatalogueList, links as catalogueListLinks } from './catalogue-list';

import desktopStyles from './catalogue.d.css';
import styles from './catalogue.css';
import { getLinks } from '~/utils';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [
  ...catalogueFromLinks(),
  ...catalogueListLinks(),
  ...localLinks(),
];

export type CatalogueOrder = 'createdAt' | 'titleAsc' | 'titleDesc';

interface CatalogueProps {
  items: CatalogueListEntryDto[];
  noFilter?: boolean;
}

export const Catalogue = ({ items, noFilter }: CatalogueProps) => {
  const [filtered, setFiltered] = useState<CatalogueListEntryDto[] | null>(
    null
  );

  function handleCatalogueSearch(needle: string) {
    const trimmed = needle.trim().toLowerCase();
    if (trimmed.length > 2) {
      const found = items.filter((item) =>
        item.title.toLowerCase().includes(trimmed)
      );
      setFiltered(found);
    } else {
      setFiltered(null);
    }
  }

  function handleOrderChange(order: CatalogueOrder) {
    const list = filtered || items;
    switch (order) {
      case 'createdAt':
        list.sort(
          (a, z) =>
            new Date(z.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setFiltered([...list]);
        break;
      case 'titleDesc':
        list.sort((a, z) =>
          a.title.toLowerCase() > z.title.toLowerCase() ? 1 : -1
        );
        setFiltered([...list]);
        break;
      case 'titleAsc':
        list.sort((a, z) =>
          a.title.toLowerCase() > z.title.toLowerCase() ? -1 : 1
        );
        setFiltered([...list]);
        break;
      default:
    }
  }

  return (
    <section
      className={cx('padded-wrap inner-page-wrap', {
        'catalogue_no-filter': noFilter,
      })}
    >
      {noFilter ? null : (
        <CatalogueForm
          onSearch={handleCatalogueSearch}
          onOrderChange={handleOrderChange}
        />
      )}
      {filtered?.length === 0 ? (
        <CatalogueNotFound />
      ) : (
        <CatalogueList items={filtered || items} />
      )}
    </section>
  );
};
