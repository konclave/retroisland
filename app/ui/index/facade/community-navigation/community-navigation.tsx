import { BREAKPOINT_DESKTOP } from '~/config';
import styles from './community-navigation.css';
import desktopStyles from './community-navigation.d.css';

export const links = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
];

export const CommunityNavigation = () => {
  return (
    <nav className="community-navigation-wrap">
      <ul className="community-navigation">
        <li className="community-navigation__item">
          <a href="https://ventl.ru/rdddra/">Гостевая книга</a>
        </li>
        <li className="community-navigation__item">
          <a
            target="_blank"
            rel="nofollow, noindex, noreferrer"
            href="https://nostalgie30-80.com/forum/login.php?0"
          >
            Форум «Ностальгия»
          </a>
        </li>
      </ul>
    </nav>
  );
};
