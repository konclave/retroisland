import type { LoaderFunction } from '@remix-run/node';
import { client } from '~/data-fetch/contentful-client';

import type { ITextPage } from '~/types/generated/contentful';

export const aboutProjectLoader: LoaderFunction = async () => {
  const page: ITextPage = await client.getEntry('71D9JjHYkgwpAn8w5rrVGf');
  page.fields.links = page.fields.links?.filter((link) => link.fields) ?? [];
  return page;
};
