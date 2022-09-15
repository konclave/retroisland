import { Facade, links as facadeLinks } from '~/ui/index/facade';
import { News, links as newsLinks } from '~/ui/index/news';

export const links = () => [
  ...facadeLinks(),
  ...newsLinks(),
];

export default function Index() {
  return (
    <>
      <Facade />
      <News />
    </>
  );
}
