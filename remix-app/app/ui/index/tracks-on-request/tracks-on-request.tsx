import { useLoaderData } from '@remix-run/react';
import { BREAKPOINT_DESKTOP } from '~/config';
import type { IndexLoaderData } from '~/loaders';
import { RequestedItem } from './components/requested-item/requested-item';
import styles from './tracks-on-request.css';
import desktopStyles from './tracks-on-request.d.css';

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

export const TracksOnRequest = () => {
  const { requested } = useLoaderData<IndexLoaderData>();

  return (
    <section className="tracks-on-request">
      <ul className="requested-list">
        {requested.map((entry) => (
          <li
            className="requested-list__item"
            data-collapsed="true"
            key={entry.id}
          >
            <RequestedItem item={entry} />
          </li>
        ))}
      </ul>
    </section>
  );
};
