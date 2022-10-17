import { useLoaderData } from '@remix-run/react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getLinks } from '~/utils';

import styles from './about-project.css';
import desktopStyles from './about-project.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...localLinks()];

export const AboutProject = () => {
  const data = useLoaderData();

  return <>{documentToReactComponents(data.fields.text)}</>;
};
