import { aboutAuthorLoader } from '~/loaders';
import { Header } from '~/ui/shared/header';
import { AboutAuthor, links as aboutAuthorLinks } from '~/ui/about-author';

import type { LoaderFunction, V2_MetaFunction } from '@remix-run/node';

export const links = () => [...aboutAuthorLinks()];

export const meta: V2_MetaFunction = () => ([
  { title: `Об авторе – ВАСИЛЬЕВСКИЙ ОСТРОВ (Музыка прошлых лет.)` },
  { name: 'description', content: `Анатолий Васильев – авторе сайта «Васильевский остров» – немного о себе`},
]);

export const loader: LoaderFunction = aboutAuthorLoader;

export default function AboutAuthorPage() {
  return (
    <>
      <Header title="Об авторе" />
      <AboutAuthor />
    </>
  );
}
