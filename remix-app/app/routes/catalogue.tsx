import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { catalogueLoader } from '~/loaders';
import type { CatalogueEntryDto } from '~/data-fetch';
import { Catalogue, links as catalogueLinks } from '~/ui/catalogue';
import { Header, links as headerLinks } from '~/ui/shared/header';

export const links = () => [...headerLinks(), ...catalogueLinks()];

export const loader: LoaderFunction = catalogueLoader;

export default function AboutAuthor() {
  const catalogueItems = useLoaderData<CatalogueEntryDto[]>();
  return (
    <>
      <header className="padded-wrap">
        <Header title="Медиатека" />
      </header>
      <Catalogue items={catalogueItems} />
    </>
  );
}
