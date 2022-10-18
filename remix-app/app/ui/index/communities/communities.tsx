import { useLoaderData } from '@remix-run/react';
import {
  CommunitiesList,
  links as communitiesListLinks,
} from '~/ui/shared/communities-list';
import { getLinks } from '~/utils';

import type { IndexLoaderData } from '~/loaders';

import styles from './communities.css';
import desktopStyles from './communities.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...communitiesListLinks(), ...localLinks()];

export const Communities = () => {
  const { content } = useLoaderData<IndexLoaderData>();

  return (
    <section className="communities">
      <h2 className="communities__title">Сообщества</h2>
      <CommunitiesList items={content.links} />
    </section>
  );
};
