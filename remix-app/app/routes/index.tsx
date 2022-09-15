import { Facade, links as facadeLinks } from '~/ui/index/facade';
import { News, links as newsLinks } from '~/ui/index/news';
import { Communities, links as communitiesLinks } from '~/ui/index/communities';

export const links = () => [
  ...facadeLinks(),
  ...newsLinks(),
  ...communitiesLinks(),
];

export default function Index() {
  return (
    <>
      <Facade />
      <News />
      <Communities />
    </>
  );
}
