import { useLoaderData } from '@remix-run/react';
import { catalogueLoader } from '~/loaders';
import { Catalogue, links as catalogueLinks } from '~/ui/catalogue';
import { Header, links as headerLinks } from '~/ui/shared/header';

import type { LoaderFunction } from '@remix-run/node';
import type { CatalogueEntryDto } from '~/data-fetch';

export const meta = () => [
  { title: 'Каталог – ВАСИЛЬЕВСКИЙ ОСТРОВ (Музыка прошлых лет.)' },
  {
    name: 'description',
    content:
      'Каталог композиций ВИА 70-х и их солистов, представленных на сайте.',
  },
];

export const links = () => [...headerLinks(), ...catalogueLinks()];

export const loader: LoaderFunction = catalogueLoader;

export default function CataloguePage() {
  const catalogueItems = useLoaderData<CatalogueEntryDto[]>();
  return (
    <>
      <Header title="Медиатека" />
      <Catalogue items={catalogueItems} />
    </>
  );
}
