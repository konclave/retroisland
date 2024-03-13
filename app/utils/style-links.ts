import { BREAKPOINT_DESKTOP, BREAKPOINT_TABLET } from '~/config';
import type { LinksFunction, LinkDescriptor } from '@remix-run/node';

export function getLinks(
  styles: string,
  desktopStyles?: string,
  tabletStyles?: string
): LinksFunction {
  return () => {
    const links: LinkDescriptor[] = [{ rel: 'stylesheet', href: styles }];
    if (desktopStyles) {
      links.push({
        rel: 'stylesheet',
        href: desktopStyles,
        media: `(min-width: ${BREAKPOINT_DESKTOP})`,
      });
    }

    if (tabletStyles) {
      links.push({
        rel: 'stylesheet',
        href: tabletStyles,
        media: `(min-width: ${BREAKPOINT_TABLET}) and (max-width: ${calcPx(
          BREAKPOINT_DESKTOP,
          -1
        )})`,
      });
    }

    return links;
  };
}

function calcPx(px: string, change: number): string {
  const num = parseInt(px, 10);
  return String(num + change) + 'px';
}
