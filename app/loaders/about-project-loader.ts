import type { LoaderFunction } from '@remix-run/node';
import { client } from '~/data-fetch/contentful-client';

import type { ITextPageFields } from '~/types/generated/contentful';

export const aboutProjectLoader: LoaderFunction = async () => {
  return client.getEntry<ITextPageFields>('71D9JjHYkgwpAn8w5rrVGf');
};
