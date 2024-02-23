import { aboutProjectLoader } from '~/loaders';
import { AboutProject, links as aboutProjectLinks } from '~/ui/about-project';
import { Header } from '~/ui/shared/header';

import type { LoaderFunction } from '@remix-run/node';

export const links = () => [...aboutProjectLinks()];

export const meta = () => [
  { title: `О проекте – ВАСИЛЬЕВСКИЙ ОСТРОВ (Музыка прошлых лет.)` },
  {
    name: 'description',
    content: `О проекте «Васильевский остров» – как появился сайт`,
  },
];

export const loader: LoaderFunction = aboutProjectLoader;

export default function AboutProjectPage() {
  return (
    <>
      <Header title="О проекте" layout="project" />
      <AboutProject />
    </>
  );
}
