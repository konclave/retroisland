import type { LoaderFunction } from '@remix-run/node';
import { Facade, links as facadeLinks } from '~/ui/index/facade';
import { News, links as newsLinks } from '~/ui/index/news';
import {
  TracksOnRequest,
  links as TracksOnRequestLinks,
} from '~/ui/index/tracks-on-request';
import { Communities, links as communitiesLinks } from '~/ui/index/communities';
import {
  CatalogueIndex,
  links as catalogueIndexLinks,
} from '~/ui/index/catalogue-index';
import { indexLoader } from '~/loaders';

if (typeof document !== 'undefined') {
  Promise.all([import('jquery')]).then(([{ default: jQuery }]) => {
    (window as any).jQuery = (window as any).$ = jQuery;
    require('./fotorama');
  });
}

export const links = () => [
  ...facadeLinks(),
  ...newsLinks(),
  ...TracksOnRequestLinks(),
  ...communitiesLinks(),
  ...catalogueIndexLinks(),
];

export const loader: LoaderFunction = indexLoader;

export default function Index() {
  return (
    <>
      <Facade />
      <News />
      <CatalogueIndex />
      <TracksOnRequest />
      <Communities />
    </>
  );
}
