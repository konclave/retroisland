import type { LoaderFunction } from '@remix-run/node'; // or cloudflare/deno

import { aboutProjectLoader } from '~/loaders';
import { AboutProject, links as aboutProjectLinks } from '~/ui/about-project';
import { Header } from '~/ui/shared/header';

export const links = () => [...aboutProjectLinks()];

export const loader: LoaderFunction = aboutProjectLoader;

export default function AboutProjectPage() {
  return (
    <>
      <Header title="О проекте" layout="project" />
      <AboutProject />
    </>
  );
}
