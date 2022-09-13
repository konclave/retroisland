import { useEffect, useState } from 'react';
import { BREAKPOINT_DESKTOP } from '~/config';
import cx from 'classnames';

import styles from './navigation.css';
import stylesDesktop from './navigation.d.css';

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
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
    return () => document.body.classList.remove('no-scroll')
  }, [isVisible])

  return (
    <section className={cx({ navigation: true, navigation_visible: isVisible })}>
      <button
        className="navigation-button navigation-open"
        type="button"
        onClick={toggleNavigation}
      >
        <svg
          className="navigation-open__icon"
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="4" y="5" width="16" height="2" rx="1" fill="#000" />
          <rect x="4" y="11" width="16" height="2" rx="1" fill="#000" />
          <rect x="4" y="17" width="16" height="2" rx="1" fill="#000" />
        </svg>
        Меню
      </button>
      <nav className="main-navigation-wrap">
        <button className="navigation-button navigation-close" type="button" onClick={toggleNavigation}>
          <svg
            className="navigation-close__icon"
            width="16"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1l14 14m0-14L1 15"
              stroke="#222"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
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
