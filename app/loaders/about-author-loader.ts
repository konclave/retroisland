import type { LoaderFunction } from '@remix-run/deno';
import { client } from '~/data-fetch/contentful-client';

export const aboutAuthorLoader: LoaderFunction = async () => {
  return client.getEntry('6ZwKknoeHy5hvPCKBdUYvC');
};
