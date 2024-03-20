import cx from 'classnames';
import { getLinks } from '~/utils';
import { OptionalLink } from '~/ui/shared/optional-link';
import { NewsDate } from './news-date';

import type { NewsListLayout } from '../news-list';

import styles from './news-item.css';
import desktopStyles from './news-item.d.css';

interface NewsEntry {
  date: string;
  text: string;
  html: string;
  link: string;
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
      {item.link ? (
        <OptionalLink link={item.link}>{item.html}</OptionalLink>
      ) : (
        <div
          className="news-item__md"
          dangerouslySetInnerHTML={{ __html: item.html }}
        />
      )}
    </article>
  );
};
