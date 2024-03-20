import type { LoaderFunction } from '@remix-run/node';
import { rssLoader } from '~/loaders';

export const loader: LoaderFunction = rssLoader;
