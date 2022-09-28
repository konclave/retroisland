import { useEffect, useState, useRef } from 'react';
import { BREAKPOINT_DESKTOP } from '~/config';

import {
  collapseH,
  collapseSection,
  expandH,
  expandSection,
} from './animation';

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

interface UseShelfNavigationReturn {
  ref: React.MutableRefObject<HTMLUListElement | null>;
  width: string;
  handleClick: (threshold: number, id: string) => void;
}

export function useShelfNavigation(id: string): UseShelfNavigationReturn {
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
      setExpandedId(id);
      window.addEventListener('resize', resizeHandler);
    }
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [id]);

  function handleClick(threshold: number, nextId: string) {
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

  return { ref: trackSection, width: itemWidth, handleClick, expandedId };
}
