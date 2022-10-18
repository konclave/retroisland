import type { LoaderFunction } from '@remix-run/node';
import { Facade, links as facadeLinks } from '~/ui/index/facade';
import { News, links as newsLinks } from '~/ui/index/news';
import {
  TracksOnRequest,
  links as TracksOnRequestLinks,
} from '~/ui/index/tracks-on-request';
import { Communities, links as communitiesLinks } from '~/ui/index/communities';
import { indexLoader } from '~/loaders';

export const links = () => [
  ...facadeLinks(),
  ...newsLinks(),
  ...TracksOnRequestLinks(),
  ...communitiesLinks(),
];

export const loader: LoaderFunction = indexLoader;

export default function Index() {
  return (
    <>
      <Facade />
      <News />
      <TracksOnRequest />
      <Communities />
    </>
  );
}
