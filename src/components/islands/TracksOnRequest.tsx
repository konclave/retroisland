import { useEffect, useState, useRef } from 'react';

// ── Animation helpers (ported from animation.ts) ─────────────────────────────

interface AnimOpts {
  threshold?: number;
  attributeRecipient?: HTMLElement;
}

function collapseSection(el: HTMLElement, opts: AnimOpts = {}) {
  const dim = el.scrollHeight;
  const prev = el.style.transition;
  el.style.transition = '';
  requestAnimationFrame(() => {
    el.style.height = dim + 'px';
    el.style.transition = prev;
    requestAnimationFrame(() => {
      el.style.height = String(opts.threshold || 0) + 'px';
    });
  });
  (opts.attributeRecipient || el).setAttribute('data-collapsed', 'true');
}

function expandSection(el: HTMLElement, opts: AnimOpts = {}) {
  el.style.height = el.scrollHeight + 'px';
  const done = () => { el.style.height = ''; el.removeEventListener('transitionend', done); };
  el.addEventListener('transitionend', done);
  (opts.attributeRecipient || el).setAttribute('data-collapsed', 'false');
}

function collapseH(el: HTMLElement, opts: AnimOpts) {
  const dim = el.getBoundingClientRect().width;
  const prev = el.style.transition;
  el.style.transition = '';
  requestAnimationFrame(() => {
    el.style.flexBasis = dim + 'px';
    el.style.transition = prev;
    requestAnimationFrame(() => {
      el.style.flexBasis = (opts.threshold || 0) + 'px';
    });
  });
  (opts.attributeRecipient || el).setAttribute('data-collapsed', 'true');
}

function expandH(el: HTMLElement, opts: AnimOpts) {
  el.style.flexBasis = el.getBoundingClientRect().width + 'px';
  const done = () => { el.style.flexBasis = 'auto'; el.removeEventListener('transitionend', done); };
  el.addEventListener('transitionend', done);
  (opts.attributeRecipient || el).setAttribute('data-collapsed', 'false');
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface TrackItem {
  id: string;
  title: string;
  link: string;
  length: string;
  youtube: string;
  ok: string;
  shortDescription: string;
}

interface RequestedItem {
  id: string;
  artist: string;
  album?: string;
  title?: string;
  tracks: TrackItem[];
}

interface Props {
  requested: RequestedItem[];
}

// ── Constants ─────────────────────────────────────────────────────────────────

const BREAKPOINT = 811;

function throttle(fn: (...a: any[]) => void, ms: number) {
  let last = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - last < ms) return;
    last = now;
    fn(...args);
  };
}

// ── Track sub-component (renders audio/yt/ok links) ─────────────────────────

function Track({ item }: { item: TrackItem }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const $ = (window as any).$;
    if (ref.current && $ && $(ref.current).jouele) {
      $(ref.current).jouele();
    }
  }, []);

  return (
    <div className="track">
      {item.link && (
        <div>
          <div className="track-wrap">
            <a
              ref={ref}
              className="jouele"
              data-hide-timeline-on-pause="true"
              id={item.id}
              href={item.link}
              data-length={item.length}
            >
              {item.title}
            </a>
          </div>
          <small className="track__description">
            {item.shortDescription || 'Скачать:'}{' '}
            <a href={item.link} download title={`Скачать «${item.title}»`} target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="-9 0 32 32">
                <path d="M13.48 17.6a.82.82 0 0 0-.84.84v3.92c0 .48-.36.84-.84.84H2.52a.82.82 0 0 1-.84-.84v-3.92c0-.44-.36-.84-.84-.84S0 18 0 18.44v3.92c0 1.4 1.12 2.52 2.52 2.52h9.28c1.4 0 2.52-1.12 2.52-2.52v-3.92c0-.44-.36-.84-.84-.84zm-6.92.88c.04.04.2.28.6.28s.56-.24.6-.28l3.52-3.52c.32-.32.32-.84 0-1.2-.32-.32-.84-.32-1.2 0L8 15.88V7.96c0-.48-.36-.84-.84-.84s-.84.36-.84.84v7.92L4.24 13.8c-.32-.32-.84-.32-1.2 0-.32.32-.32.84 0 1.2l3.52 3.48z" />
              </svg>
            </a>
          </small>
        </div>
      )}
      {item.youtube && (
        <div className="track-wrap">
          <img className="track__icon" src="/img/youtube.svg" height={20} alt={item.title} />
          <a href={item.youtube} target="_blank" rel="noopener noreferrer nofollow">{item.title}</a>
        </div>
      )}
      {item.ok && (
        <div className="track-wrap">
          <a href={item.ok} target="_blank" rel="noopener noreferrer nofollow">{item.title}</a>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function TracksOnRequest({ requested }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [itemWidth, setItemWidth] = useState('auto');
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function updateWidth() {
      const el = listRef.current?.querySelector<HTMLElement>('[data-collapsed="false"]');
      if (el) setItemWidth(el.getBoundingClientRect().width + 'px');
    }

    if (window.innerWidth > BREAKPOINT) {
      setExpandedId(requested[0]?.id ?? null);
      const handler = throttle(updateWidth, 250);
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    }
  }, []);

  function handleToggle(e: React.MouseEvent<HTMLButtonElement>, item: RequestedItem) {
    const threshold = parseInt(window.getComputedStyle(e.currentTarget).height);
    const next = listRef.current?.querySelector<HTMLElement>(`[data-id="${item.id}"]`);
    if (!next) return;

    if (window.innerWidth > BREAKPOINT) {
      const opened = listRef.current?.querySelector<HTMLElement>(`[data-id="${expandedId}"]`);
      if (opened) collapseH(opened, { threshold });
      setExpandedId(item.id);
      expandH(next, { threshold });
    } else {
      const tracks = next.querySelector<HTMLElement>('.requested-item-tracks');
      if (!tracks) return;
      if (next.getAttribute('data-collapsed') === 'true') {
        const prevTracks = listRef.current?.querySelector<HTMLElement>(
          `[data-id="${expandedId}"] .requested-item-tracks`
        );
        if (prevTracks) {
          collapseSection(prevTracks, {
            attributeRecipient: prevTracks.closest<HTMLElement>('.requested-list__item') ?? undefined,
          });
        }
        expandSection(tracks, { attributeRecipient: next });
        setExpandedId(item.id);
      } else {
        collapseSection(tracks, { attributeRecipient: next });
      }
    }
  }

  return (
    <section className="tracks-on-request">
      <h2 className="tracks-on-request__title">Концерт по заявкам</h2>
      <ul className="requested-list" ref={listRef}>
        {requested.map((item) => {
          const label = item.title || item.artist + (item.album ? ', ' + item.album : '');
          return (
            <li
              key={item.id}
              className="requested-list__item"
              data-id={item.id}
              data-collapsed={item.id !== expandedId ? 'true' : 'false'}
            >
              <article className="requested-item">
                <button
                  className="requested-item__toggle-visibility"
                  type="button"
                  onClick={(e) => handleToggle(e, item)}
                >
                  {label}
                </button>
                <div className="requested-item-tracks" style={{ width: itemWidth }}>
                  <h2 className="requested-item-tracks__title">Концерт по заявкам</h2>
                  <h3 className="requested-item-tracks__author">{item.artist}</h3>
                  {item.album && <h4 className="requested-item-tracks__album">{item.album}</h4>}
                  <div className="requested-item-tracks__list-container">
                    <ol className="track-list jouele-playlist">
                      {item.tracks.map((track) => (
                        <li key={track.id} className="track-list__item">
                          <Track item={track} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
