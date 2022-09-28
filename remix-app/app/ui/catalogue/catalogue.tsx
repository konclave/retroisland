import { useState } from 'react';
import type { CatalogueEntryDto } from '~/data-fetch';
import {
  CatalogueNotFound,
  links as notFoundLinks,
} from './catalogue-not-found';
import { CatalogueForm, links as catalogueFromLinks } from './catalogue-form';
import { CatalogueList, links as catalogueListLinks } from './catalogue-list';

export const links = () => [...catalogueFromLinks(), ...catalogueListLinks()];

interface CatalogueProps {
  items: CatalogueEntryDto[];
}

export const Catalogue = ({ items }: CatalogueProps) => {
  const [filtered, setFiltered] = useState<CatalogueEntryDto[] | null>(null);

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

  return (
    <section className="padded-wrap inner-page-wrap">
      <CatalogueForm onSearch={handleCatalogueSearch} />
      {filtered?.length === 0 ? (
        <CatalogueNotFound />
      ) : (
        <CatalogueList items={filtered || items} />
      )}
    </section>
  );
};
