import { BREAKPOINT_DESKTOP } from '~/config';
import { Header, links as headerLinks } from '../../shared/header';
import {
  CommunityNavigation,
  links as communityNavigationLinks,
} from './community-navigation';
import styles from './facade.css';
import desktopStyles from './facade.d.css';

export const links = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
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
