import { BREAKPOINT_DESKTOP } from '~/config';
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
];

export const Facade = () => {
  return (
    <section className="facade">
      <div className="padded-wrap">
        <h1 className="main-title main-title_index">Васильевский остров</h1>
        <p className="main-subtitle">
          Авторский сайт о вокально-инструментальных ансамблях и музыке
          советской эпохи
        </p>
        <CommunityNavigation />
      </div>
    </section>
  );
};
