import { Link, useLoaderData } from '@remix-run/react';
import { BREAKPOINT_DESKTOP } from '~/config';
import { getLinks } from '~/utils';
import { NewsList, links as newsListLinks } from '~/ui/shared/news-list';
import { NewsFooter, links as footerLinks } from './news-footer';

import type { NewsItemDto } from '~/data-fetch';
import type { IndexLoaderData } from '~/loaders';

import styles from './news.css';
import desktopStyles from './news.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [
  ...localLinks(),
  ...newsListLinks(),
  ...footerLinks(),
];

export const News = () => {
  const { news } = useLoaderData<IndexLoaderData>();

  return (
    <section className="news">
      <h2>Новости</h2>
      <NewsList news={news} />
      <NewsFooter />
    </section>
  );
};
