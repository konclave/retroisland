import type { LoaderFunction } from '@remix-run/deno';
import { json } from '@remix-run/deno';
import { fetchCatalogueEntry } from '~/data-fetch';

export const catalogueEntryLoader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    throw new Error('Slug is required');
  }
  const page = await fetchCatalogueEntry(params.slug);

  if (!page) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  return json(page);
};
