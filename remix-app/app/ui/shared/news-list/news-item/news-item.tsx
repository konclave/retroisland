import cx from 'classnames';
import { getLinks } from '~/utils';
import { NewsDate } from './news-date';

import type { NewsListLayout } from '../news-list';

import styles from './news-item.css';
import desktopStyles from './news-item.d.css';

interface NewsEntry {
  date: string;
  text: string;
}

export const links = getLinks(styles, desktopStyles);

interface NewsItemProps {
  item: NewsEntry;
  layout: NewsListLayout;
}

export const NewsItem = ({ item, layout }: NewsItemProps) => {
  return (
    <article
      className={cx('news-item', { 'news-item_archive': layout === 'archive' })}
    >
      <time dateTime="item.date">
        <NewsDate date={item.date} />
      </time>
      {item.text}
    </article>
  );
};
