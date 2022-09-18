import { Link, useLoaderData } from '@remix-run/react';
import { BREAKPOINT_DESKTOP } from '~/config';
import { NewsItem } from './news-item';
import type { NewsItemDto } from '~/data-fetch';
import styles from './news.css';
import desktopStyles from './news.d.css';

export const links = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
];

export const News = () => {
  const { news } = useLoaderData();

  return (
    <section className="news">
      <h2>Новости</h2>
      <ul className="news-list">
        {news?.map((entry: NewsItemDto) => (
          <li className="news-list__item" key={entry.id}>
            <NewsItem item={entry} />
          </li>
        ))}
      </ul>

      <div className="news-footer">
        <Link className="news-archive-link" to="/archive">
          Архив новостей
        </Link>
      </div>
    </section>
  );
};
