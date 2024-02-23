import { useEffect, useState } from 'react';
import { NavLink, useLocation } from '@remix-run/react';
import cx from 'classnames';
import { IconBurger } from '../icons/icon-burger';
import { IconCross } from '../icons/icon-cross';
import { getLinks } from '~/utils';

import styles from './navigation.css';
import stylesDesktop from './navigation.d.css';

const localLinks = getLinks(styles, stylesDesktop);

export const links = () => [...localLinks()];

export const Navigation = () => {
  const [isVisible, setIsVisible] = useState<Boolean>(false);

  let location = useLocation();

  const isArchive = location.pathname === '/news-archive';

  useEffect(() => {
    setIsVisible(false);
    if (typeof document !== 'undefined') {
      const jouele = (window as any).$?.Jouele;
      if (jouele) {
        jouele.history.forEach((jInstance: any) => {
          if (jInstance.isPlaying()) {
            jInstance.pause();
          }
        });
      }
    }
  }, [location]);

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
      className={cx('navigation', {
        navigation_visible: isVisible,
        navigation_archive: isArchive,
      })}
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
            <NavLink to="/">Главная</NavLink>
          </li>
          <li className="main-navigation__item">
            <NavLink to="/catalogue" end>
              Каталог
            </NavLink>
          </li>
          <li className="main-navigation__item">
            <NavLink to="/about-project">О проекте</NavLink>
          </li>
          <li className="main-navigation__item">
            <NavLink to="/about-author">Об авторе</NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};
