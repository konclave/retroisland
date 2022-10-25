import type { LoaderFunction } from '@remix-run/deno'; // or cloudflare/deno

import { aboutAuthorLoader } from '~/loaders';
import { Header } from '~/ui/shared/header';
import { AboutAuthor, links as aboutAuthorLinks } from '~/ui/about-author';

export const links = () => [...aboutAuthorLinks()];

export const loader: LoaderFunction = aboutAuthorLoader;

export default function AboutAuthorPage() {
  return (
    <>
      <Header title="Об авторе" />
      <AboutAuthor />
    </>
  );
}
