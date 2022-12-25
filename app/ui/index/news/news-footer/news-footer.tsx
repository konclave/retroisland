import { Link } from '@remix-run/react';
import { getLinks } from '~/utils';

import styles from './news-footer.css';
import desktopStyles from './news-footer.d.css';

export const links = getLinks(styles, desktopStyles);

export const NewsFooter = () => {
  return (
    <div className="news-footer">
      <Link className="news-archive-link" to="/news-archive">
        Архив новостей
      </Link>
    </div>
  );
};
