import { useLoaderData } from '@remix-run/react';
import { getLinks } from '~/utils';

import type { IndexLoaderData } from '~/loaders';
import {
  RequestedItem,
  links as requestedItemLinks,
} from './requested-item/requested-item';
import { useShelfNavigation } from './use-shelf-navigation';

import styles from './tracks-on-request.css';
import desktopStyles from './tracks-on-request.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...localLinks(), ...requestedItemLinks()];

export const TracksOnRequest = () => {
  const { requested } = useLoaderData<IndexLoaderData>();
  const {
    ref: trackSection,
    width,
    handleClick,
    expandedId,
  } = useShelfNavigation(requested[0].id);

  return (
    <section className="tracks-on-request">
      <h2 className="tracks-on-request__title">Концерт по заявкам</h2>
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
              width={width}
              onToggleClick={handleClick}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
