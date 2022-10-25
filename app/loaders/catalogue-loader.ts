import type { LoaderFunction } from '@remix-run/deno';
import { fetchCatalogueList } from '~/data-fetch';

export const catalogueLoader: LoaderFunction = async () => {
  return fetchCatalogueList();
};
