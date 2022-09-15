import { useEffect, useState } from 'react';
import { BREAKPOINT_DESKTOP } from '~/config';
import cx from 'classnames';

import styles from './navigation.css';
import stylesDesktop from './navigation.d.css';
import { IconBurger } from '../icons/icon-burger';
import { IconCross } from '../icons/icon-cross';

export const links = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: stylesDesktop,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
];

export const Navigation = () => {
  const [isVisible, setIsVisible] = useState<Boolean>(false);

  const toggleNavigation = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [isVisible]);

  return (
    <section
      className={cx({ navigation: true, navigation_visible: isVisible })}
    >
      <button
        className="navigation-button navigation-open"
        type="button"
        onClick={toggleNavigation}
      >
        <IconBurger className="navigation-open__icon" />
        Меню
      </button>
      <nav className="main-navigation-wrap">
        <button
          className="navigation-button navigation-close"
          type="button"
          onClick={toggleNavigation}
        >
          <IconCross className="navigation-close__icon" />
        </button>
        <ul className="main-navigation">
          <li className="main-navigation__item">
            <a href="/catalogue">Каталог</a>
          </li>
          <li className="main-navigation__item">
            <a href="/about-project">О проекте</a>
          </li>
          <li className="main-navigation__item">
            <a href="/about-author">Об авторе</a>
          </li>
        </ul>
      </nav>
    </section>
  );
};
