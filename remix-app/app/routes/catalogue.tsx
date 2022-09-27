import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { catalogueLoader } from '~/loaders';
import { Catalogue, links as catalogueLinks } from '~/ui/catalogue';
import { Header, links as headerLinks } from '~/ui/shared/header';

export const links = () => [...catalogueLinks(), ...headerLinks()];

export const loader: LoaderFunction = catalogueLoader;

export default function AboutAuthor() {
  const catalogueItems = useLoaderData();
  return (
    <>
      <header className="padded-wrap">
        <Header title="Медиатека" />
      </header>
      <Catalogue items={catalogueItems} />
    </>
  );
}
