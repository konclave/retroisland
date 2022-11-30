import { useState } from 'react';
import type { CatalogueListEntryDto } from '~/data-fetch';
import {
  CatalogueNotFound,
  links as notFoundLinks,
} from './catalogue-not-found';
import { CatalogueForm, links as catalogueFromLinks } from './catalogue-form';
import { CatalogueList, links as catalogueListLinks } from './catalogue-list';

export const links = () => [...catalogueFromLinks(), ...catalogueListLinks()];

export type CatalogueOrder = 'createdAt' | 'titleAsc' | 'titleDesc';

interface CatalogueProps {
  items: CatalogueListEntryDto[];
}

export const Catalogue = ({ items }: CatalogueProps) => {
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
            new Date(a.createdAt).getTime() - new Date(z.createdAt).getTime()
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
    <section className="padded-wrap inner-page-wrap">
      <CatalogueForm
        onSearch={handleCatalogueSearch}
        onOrderChange={handleOrderChange}
      />
      {filtered?.length === 0 ? (
        <CatalogueNotFound />
      ) : (
        <CatalogueList items={filtered || items} />
      )}
    </section>
  );
};
