import { useLoaderData } from '@remix-run/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getLinks } from '~/utils';
import { Header } from '~/ui/shared/header';
import {
  CommunitiesList,
  links as communitiesListLinks,
} from '~/ui/shared/communities-list';

import styles from './about-project.css';
import desktopStyles from './about-project.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...communitiesListLinks(), ...localLinks()];

export const AboutProject = () => {
  const data = useLoaderData();
  return (
    <>
      <section className="about-project padded-wrap">
        <header>
          <Header title="О проекте" />
        </header>
        <div className="about-project__content">
          {documentToReactComponents(data.fields.text)}
        </div>
      </section>
      <div className="about-project-links">
        <h2 className="about-project-links__title padded-wrap">Ссылки</h2>
        <CommunitiesList items={data.fields.links} />
      </div>
    </>
  );
};
