import type { LoaderFunction } from '@remix-run/node';
import { fetchCatalogueEntry } from '~/data-fetch';

export const catalogueEntryLoader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    throw new Error('Slug is required');
  }
  return fetchCatalogueEntry(params.slug);
};
