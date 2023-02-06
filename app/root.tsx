import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch, useLoaderData,
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

import type { V2_MetaFunction } from "@remix-run/node";
import {json} from "@remix-run/node";

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

export const loader = async () => {
  return json({ panelbearId: process.env.PANEL_BEAR_ID });
};

export const meta: V2_MetaFunction = () => ([
  { title: 'ВАСИЛЬЕВСКИЙ ОСТРОВ (Музыка прошлых лет.)' },
  { name: 'description', content: 'Коллекция редких песен вокально-инструментальных ансамблей 70-х годов, а также их солистов.'},
]);

export default function App() {
  const { panelbearId } = useLoaderData<typeof loader>();
  return (
    <html lang="ru-Ru">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {
          process.env.NODE_ENV === 'development' || !panelbearId ? null : (
            <>
              <script async src={`https://cdn.panelbear.com/analytics.js?site=${panelbearId}`} />
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.panelbear = window.panelbear || function() { (window.panelbear.q = window.panelbear.q || []).push(arguments); }; panelbear('config', { site: '${panelbearId}' });`,
                }}
              />
            </>
          )
        }
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
        <title>ВАСИЛЬЕВСКИЙ ОСТРОВ (Музыка прошлых лет.)</title>
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
