import type { LoaderFunction } from '@remix-run/node';
import { client } from '~/data-fetch/contentful-client';

export const aboutProjectLoader: LoaderFunction = async () => {
  return client.getEntry('71D9JjHYkgwpAn8w5rrVGf');
};
