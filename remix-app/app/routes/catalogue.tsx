import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { catalogueLoader } from '~/loaders';
import { Catalogue, links as catalogueLinks } from '~/ui/catalogue';

export const links = () => [...catalogueLinks()];

export const loader: LoaderFunction = catalogueLoader;

export default function AboutAuthor() {
  const data = useLoaderData();
  console.log('@@@', data);
  return <Catalogue items={data} />;
}
