import type { MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import normalizeStyles from '~/styles/normalize.css';
import colorsStyles from '~/styles/colors.css';
import fontsStyles from '~/styles/fonts.css';
import mainStyles from '~/styles/main.css';
import desktopStyles from '~/styles/desktop.css';
import { Navigation, links as navitationLinks } from '~/ui/shared/navigation';
import { About, links as aboutLinks } from '~/ui/shared/about';
import { BREAKPOINT_DESKTOP } from '~/config';

export const links = () => [
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
];

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Retroisland',
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