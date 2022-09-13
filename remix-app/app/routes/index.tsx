import { Facade, links as facadeLinks } from '~/ui/index/facade';

export const links = () => [...facadeLinks()];

export default function Index() {
  return <Facade />;
}
