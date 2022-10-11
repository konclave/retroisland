import { Link } from '@remix-run/react';
import { BREAKPOINT_DESKTOP } from '~/config';
import cx from 'classnames';
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

export type HeaderLayout = 'generic' | 'archive' | 'index';

interface HeaderProps {
  title?: string;
  force?: boolean;
  layout?: HeaderLayout;
}

export const Header = ({
  title,
  force = false,
  layout = 'generic',
}: HeaderProps) => {
  const isIndex = layout === 'index';
  const isArchive = layout === 'archive';
  return (
    <>
      <h1
        className={cx('main-title', {
          'main-title_index': isIndex,
          'main-title_archive': isArchive,
        })}
      >
        {isIndex ? (
          'Васильевский остров'
        ) : (
          <Link
            to="/"
            className={cx('main-title__website', {
              'main-title__website_forced': force,
            })}
          >
            Васильевский остров
          </Link>
        )}
        {title && <span className="main-title__section">{title}</span>}
      </h1>
      <p
        className={cx('main-subtitle', { 'main-subtitle_archive': isArchive })}
      >
        Авторский сайт о вокально-инструментальных ансамблях и музыке советской
        эпохи
      </p>
    </>
  );
};
