import type { LoaderFunction } from '@remix-run/node';
import { fetchCatalogueList } from '~/data-fetch';

export const catalogueLoader: LoaderFunction = async () => {
  return fetchCatalogueList();
};
