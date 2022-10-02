import type { MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react';

import normalizeStyles from '~/styles/normalize.css';
import colorsStyles from '~/styles/colors.css';
import fontsStyles from '~/styles/fonts.css';
import mainStyles from '~/styles/main.css';
import desktopStyles from '~/styles/desktop.css';

import { Navigation, links as navitationLinks } from '~/ui/shared/navigation';
import { About, links as aboutLinks } from '~/ui/shared/about';
import { ErrorPage, links as errorPageLinks } from '~/ui/error-page';
import { BREAKPOINT_DESKTOP } from '~/config';

export const links = () => [
  { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
  { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/manifest.webmanifest' },
  { rel: 'stylesheet', href: normalizeStyles },
  { rel: 'stylesheet', href: colorsStyles },
  { rel: 'stylesheet', href: fontsStyles },
  { rel: 'stylesheet', href: mainStyles },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
  ...navitationLinks(),
  ...aboutLinks(),
  ...errorPageLinks(),
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'ВАСИЛЬЕВСКИЙ ОСТРОВ (Музыка прошлых лет.)',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="ru-Ru">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navigation />
        <Outlet />
        <About />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html lang="ru-Ru">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorPage error={caught} />
        <Scripts />
      </body>
    </html>
  );
}
