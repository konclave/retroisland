import { useEffect, useState, useRef } from 'react';
import { useLoaderData } from '@remix-run/react';
import { BREAKPOINT_DESKTOP } from '~/config';
import type { IndexLoaderData } from '~/loaders';
import { RequestedItem } from './components/requested-item/requested-item';
import styles from './tracks-on-request.css';
import desktopStyles from './tracks-on-request.d.css';
import {
  collapseH,
  collapseSection,
  expandH,
  expandSection,
} from './animation';

if (typeof document !== 'undefined') {
  Promise.all([import('howler'), import('jquery')]).then(
    ([
      {
        default: { Howl },
      },
      { default: jQuery },
    ]) => {
      (window as any).Howl = Howl;
      (window as any).jQuery = (window as any).$ = jQuery;
      import('ilyabirman-jouele');
    }
  );
}

export const links = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
];

const BREAKPOINT_NUMERIC = parseInt(BREAKPOINT_DESKTOP);

function throttle(fn: (...args: any) => any, delay: number) {
  let lastCalled = 0;
  return (...args: any[]) => {
    let now = new Date().getTime();
    if (now - lastCalled < delay) {
      return;
    }
    lastCalled = now;
    return fn(...args);
  };
}

export const TracksOnRequest = () => {
  const { requested } = useLoaderData<IndexLoaderData>();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const trackSection = useRef<HTMLUListElement | null>(null);
  const [itemWidth, setItemWidth] = useState<string>('auto');

  function setTrackContainerWidth() {
    const boundRect = trackSection?.current
      ?.querySelector('[data-collapsed="false"]')
      ?.getBoundingClientRect();
    setItemWidth(boundRect?.width + 'px' || 'auto');
  }

  useEffect(() => {
    const resizeHandler = throttle(setTrackContainerWidth, 250);
    if (window.innerWidth > BREAKPOINT_NUMERIC) {
      setExpandedId(requested[0].id);
      window.addEventListener('resize', resizeHandler);
    }
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [requested]);

  function handleToggleClick(threshold: number, nextId: string) {
    const next = nextId
      ? (trackSection.current?.querySelector(
          `[data-id="${nextId}"]`
        ) as HTMLElement)
      : null;
    if (!next) {
      return;
    }
    if (window.innerWidth > BREAKPOINT_NUMERIC) {
      const opened = trackSection.current?.querySelector(
        `[data-id="${expandedId}"]`
      ) as HTMLElement;
      if (opened) {
        collapseH(opened, { threshold });
      }
      setExpandedId(nextId);
      expandH(next, { threshold });
    } else {
      const currentTracksList = next.querySelector(
        '.requested-item-tracks'
      ) as HTMLElement;
      if (next.getAttribute('data-collapsed') === 'true') {
        const expanded = trackSection.current?.querySelector(
          `[data-id="${expandedId}"] .requested-item-tracks`
        ) as HTMLElement;
        if (expanded) {
          const expandedContainer = expanded.closest(
            '.requested-list__item'
          ) as HTMLElement;
          collapseSection(expanded, { attributeRecipient: expandedContainer });
        }
        expandSection(currentTracksList, { attributeRecipient: next });
        setExpandedId(nextId);
      } else {
        collapseSection(currentTracksList, { attributeRecipient: next });
      }
    }
  }

  return (
    <section className="tracks-on-request">
      <ul
        className="requested-list"
        ref={(ul) => {
          trackSection.current = ul;
        }}
      >
        {requested.map((entry) => (
          <li
            className="requested-list__item"
            data-id={entry.id}
            data-collapsed={entry.id !== expandedId}
            key={entry.id}
          >
            <RequestedItem
              item={entry}
              width={itemWidth}
              onToggleClick={handleToggleClick}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
