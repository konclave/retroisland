import { getLinks } from '~/utils';
import { Header, links as headerLinks } from '~/ui/shared/header';
import {
  CommunityNavigation,
  links as communityNavigationLinks,
} from './community-navigation';
import styles from './facade.css';
import desktopStyles from './facade.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [
  ...localLinks(),
  ...headerLinks(),
  ...communityNavigationLinks(),
];

export const Facade = () => {
  return (
    <section className="facade">
      <div className="padded-wrap">
        <Header />
        <CommunityNavigation />
      </div>
    </section>
  );
};
