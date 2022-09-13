import { BREAKPOINT_DESKTOP } from '~/config';
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
        <nav className="community-navigation-wrap">
          <ul className="community-navigation">
            <li className="community-navigation__item">
              <a href="/guestbook/">Гостевая книга</a>
            </li>
            <li className="community-navigation__item">
              <a
                target="_blank"
                rel="nofollow, noindex, noreferrer"
                href="http://nostalgie30-80.com/forum/login.php?0"
              >
                Форум «Ностальгия»
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};
