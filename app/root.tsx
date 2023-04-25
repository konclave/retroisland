import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
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

import type { V2_MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

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

export const meta: V2_MetaFunction = () => [
  { title: 'ВАСИЛЬЕВСКИЙ ОСТРОВ (Музыка прошлых лет.)' },
  {
    name: 'description',
    content:
      'Коллекция редких песен вокально-инструментальных ансамблей 70-х годов, а также их солистов.',
  },
];

export default function App() {
  const { panelbearId } = useLoaderData<typeof loader>();
  return (
    <html lang="ru-Ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {process.env.NODE_ENV === 'development' || !panelbearId ? null : (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                !function(){var t=window.firstparty=window.firstparty||[];if(!t.initialize){if(t.invoked)return void(window.console&&console.error&&console.error("Firstparty snippet included twice."));t.invoked=!0,t.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"],t.factory=function(r){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(r),t.push(e),t}};for(var r=0;r<t.methods.length;r++){var e=t.methods[r];t[e]=t.factory(e)}t.load=function(r,e,i){t._writeKey=r,t._host=e,t._firstpartyOptions=i;var a="/js/firstparty.min.js";void 0!==i&&void 0!==i.libraryPath&&(a=i.libraryPath);var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src="https://"+e+a;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(o,n)},t.SNIPPET_VERSION="0.1.0"}}();
                firstparty.load("${panelbearId}", "${panelbearId}.a.firstpartydns.com");
                firstparty.page();`,
              }}
            />
          </>
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
