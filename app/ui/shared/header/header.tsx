import { Link } from '@remix-run/react';
import { getLinks } from '~/utils';
import cx from 'classnames';

import styles from './header.css';
import desktopStyles from './header.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...localLinks()];

export type HeaderLayout = 'generic' | 'archive' | 'index' | 'project';

interface HeaderProps {
  title?: string;
  force?: boolean;
  layout?: HeaderLayout;
  className?: string;
}

export const Header = ({
  title,
  force = false,
  layout = 'generic',
  className,
}: HeaderProps) => {
  const isIndex = layout === 'index';
  const isArchive = layout === 'archive';
  const isAboutProject = layout === 'project';
  return (
    <header
      className={cx('header padded-wrap', className, {
        header_index: isIndex,
        header_archive: isArchive,
        header_project: isAboutProject,
      })}
    >
      <h1
        className={cx('main-title', {
          'main-title_index': isIndex,
          'main-title_archive': isArchive,
          'main-title_about-project': isAboutProject,
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
        className={cx('main-subtitle', {
          'main-subtitle_archive': isArchive,
          'main-subtitle_about-project': isAboutProject,
        })}
      >
        Авторский сайт о вокально-инструментальных ансамблях и музыке советской
        эпохи
      </p>
    </header>
  );
};
