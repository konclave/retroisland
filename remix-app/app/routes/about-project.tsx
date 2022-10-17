import type { LoaderFunction } from '@remix-run/node'; // or cloudflare/deno

import { aboutProjectLoader } from '~/loaders';
import { Header } from '~/ui/shared/header';
import { AboutProject, links as aboutProjectLinks } from '~/ui/about-project';

export const links = () => [...aboutProjectLinks()];

export const loader: LoaderFunction = aboutProjectLoader;

export default function AboutProjectPage() {
  return (
    <>
      <header className="padded-wrap">
        <Header title="О проекте" />
      </header>
      <AboutProject />
    </>
  );
}
