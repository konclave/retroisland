import { json } from '@remix-run/node';
import { NewsArchive, links as newsArchiveLinks } from '~/ui/news-archive';
import { Header, links as headerLinks } from '~/ui/shared/header';
import { fetchNews } from '~/data-fetch';

import type { LoaderFunction } from '@remix-run/node';

export const links = () => [...headerLinks(), ...newsArchiveLinks()];

export const meta = () => [
  { title: 'Новости – ВАСИЛЬЕВСКИЙ ОСТРОВ (Музыка прошлых лет.)' },
  { name: 'description', content: ' Новости о последних изменениях на сайте.' },
];

export const loader: LoaderFunction = async ({ request }) => {
  const page = Number(new URL(request.url).searchParams.get('page')) || 0;
  const newsPage = await fetchNews({ page });
  return json(newsPage);
};

export default function AboutAuthor() {
  return (
    <>
      <Header title="Архив новостей" layout="archive" />
      <NewsArchive />
    </>
  );
}
