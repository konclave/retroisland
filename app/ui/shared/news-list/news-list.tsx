import cx from 'classnames';
import { getLinks } from '~/utils';
import type { NewsItemDto } from '~/data-fetch';
import { NewsItem, links as newsItemLinks } from './news-item';

import styles from './news-list.css';
import desktopStyles from './news-list.d.css';

export type NewsListLayout = 'index' | 'archive';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...localLinks(), ...newsItemLinks()];

interface NewsListProps {
  news: NewsItemDto[];
  layout?: NewsListLayout;
}

export const NewsList = ({ news, layout = 'index' }: NewsListProps) => {
  return (
    <ul
      className={cx('news-list', { 'news-list_archive': layout === 'archive' })}
    >
      {news?.map((entry: NewsItemDto) => (
        <li className="news-list__item" key={entry.id}>
          <NewsItem item={entry} layout={layout} />
        </li>
      ))}
    </ul>
  );
};
