import { useLocation, Link } from '@remix-run/react';
import { BREAKPOINT_DESKTOP } from '~/config';
import styles from './header.css';
import desktopStyles from './header.d.css';

export const links = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
];

interface HeaderProps {
  title?: string;
}

export const Header = ({ title }: HeaderProps) => {
  const location = useLocation();
  const isIndex = location.pathname === '/';
  return (
    <>
      <h1 className={'main-title' + (isIndex ? ' main-title_index' : '')}>
        {isIndex ? (
          'Васильевский остров'
        ) : (
          <Link to="/" className="main-title__website">
            Васильевский остров
          </Link>
        )}
        {title && <span className="main-title__section">{title}</span>}
      </h1>
      <p className="main-subtitle">
        Авторский сайт о вокально-инструментальных ансамблях и музыке советской
        эпохи
      </p>
    </>
  );
};
