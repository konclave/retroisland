import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Header, links as headerLinks } from '~/ui/shared/header';
import {
  CatalogueEntry,
  links as catalogueEntryLinks,
} from '~/ui/catalogue-entry';
import { catalogueEntryLoader } from '~/loaders';

export const links = () => [...headerLinks(), ...catalogueEntryLinks()];

export const loader: LoaderFunction = catalogueEntryLoader;

export default function CatalogueEntryPage() {
  const data = useLoaderData();
  return (
    <>
      <Header title="" />
      <CatalogueEntry entry={data} />
    </>
  );
}
