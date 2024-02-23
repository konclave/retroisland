import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';
import { Analytics } from '@vercel/analytics/react';

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

export const meta = () => [
  { title: 'ВАСИЛЬЕВСКИЙ ОСТРОВ (Музыка прошлых лет.)' },
  {
    name: 'description',
    content:
      'Коллекция редких песен вокально-инструментальных ансамблей 70-х годов, а также их солистов.',
  },
];

export default function App() {
  return (
    <html lang="ru-Ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {process.env.NODE_ENV === 'development' ? null : (
          <script
            async
            defer
            src="https://beampipe.io/js/tracker.js"
            data-beampipe-domain="retroisland.net"
          ></script>
        )}
        <Meta />
        <Links />
      </head>
      <body>
        <Navigation />
        <Outlet />
        <About />
        <ScrollRestoration />
        <Scripts />
        <Analytics />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="ru-Ru">
      <head>
        <title>ВАСИЛЬЕВСКИЙ ОСТРОВ (Музыка прошлых лет.)</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ErrorPage error={error} />
        <Scripts />
      </body>
    </html>
  );
}
