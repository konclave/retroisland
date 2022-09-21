import type { LoaderFunction } from '@remix-run/node'; // or cloudflare/deno
import { useLoaderData } from '@remix-run/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { aboutAuthorLoader } from '~/loaders';

export const links = () => [];

export const loader: LoaderFunction = aboutAuthorLoader;

export default function AboutAuthor() {
  const data = useLoaderData();
  return (
    <>
      <h1>Об авторе</h1>
      {documentToReactComponents(data.fields.text)}
    </>
  );
}
