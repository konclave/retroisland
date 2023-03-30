import { useLoaderData } from '@remix-run/react';
import { getLinks } from '~/utils';
import { NewsList, links as newsListLinks } from '~/ui/shared/news-list';
import { NewsFooter, links as footerLinks } from './news-footer';

import styles from './news.css';
import desktopStyles from './news.d.css';
import type { indexLoader } from '~/loaders';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [
  ...localLinks(),
  ...newsListLinks(),
  ...footerLinks(),
];

export const News = () => {
  const { news } = useLoaderData<typeof indexLoader>();

  return (
    <section className="news">
      <h2>Новости</h2>
      <NewsList news={news} />
      <NewsFooter />
    </section>
  );
};
