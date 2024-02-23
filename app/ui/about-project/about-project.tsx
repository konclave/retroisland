import { useLoaderData } from '@remix-run/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getLinks } from '~/utils';

import type { aboutProjectLoader } from '~/loaders';

import {
  CommunitiesList,
  links as communitiesListLinks,
} from '~/ui/shared/communities-list';

import styles from './about-project.css';
import desktopStyles from './about-project.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...communitiesListLinks(), ...localLinks()];

export const AboutProject = () => {
  const data = useLoaderData<typeof aboutProjectLoader>();
  return (
    <>
      <section className="about-project padded-wrap">
        <div className="about-project__content">
          {documentToReactComponents(data.fields.text)}
        </div>
      </section>
      {data.fields.links.length === 0 ? null : (
        <div className="about-project-links">
          <h2 className="about-project-links__title padded-wrap">Ссылки</h2>
          <CommunitiesList items={data.fields.links} />
        </div>
      )}
    </>
  );
};
