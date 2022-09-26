import { CatalogueForm, links as catalogueFromLinks } from './catalogue-form';
import { CatalogueList, links as catalogueListLinks } from './catalogue-list';

export const links = () => [...catalogueFromLinks(), ...catalogueListLinks()];

interface CatalogueProps {
  items: any;
}

export const Catalogue = ({ items }: CatalogueProps) => {
  function handleCatalogueSearch(needle: string) {
    console.log(needle);
  }

  return (
    <section className="padded-wrap">
      <CatalogueForm onSearch={handleCatalogueSearch} />
      <CatalogueList items={items} />
    </section>
  );
};
