import { useLoaderData } from '@remix-run/react';
import {
  CommunitiesList,
  links as communitiesListLinks,
} from '~/ui/shared/communities-list';
import { getLinks } from '~/utils';

import type { IndexLoaderData } from '~/loaders';
import type { IOuterLink } from '~/types/generated/contentful';

import styles from './communities.css';
import desktopStyles from './communities.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...communitiesListLinks(), ...localLinks()];

export const Communities = () => {
  const { content } = useLoaderData<IndexLoaderData>();

  if (!content.links || content.links.length === 0) {
    return null;
  }

  return (
    <section className="communities">
      <h2 className="communities__title">Сообщества</h2>
      <CommunitiesList items={content.links as IOuterLink[]} />
    </section>
  );
};
