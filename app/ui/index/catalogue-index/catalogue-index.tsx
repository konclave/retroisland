import { useLoaderData } from '@remix-run/react';
import { Catalogue, links as catalogueLinks } from '~/ui/catalogue';
import { links as buttonLinks } from '~/ui/shared/buttons/button-load-more';
import { getLinks } from '~/utils';

import type { IndexLoaderData } from '~/loaders';

import styles from './catalogue-index.css';
import desktopStyles from './catalogue-index.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [
  ...buttonLinks(),
  ...catalogueLinks(),
  ...localLinks(),
];

export const CatalogueIndex = () => {
  const { catalogueItems } = useLoaderData<IndexLoaderData>();
  return (
    <div className="catalogue-index">
      <h2 className="catalogue-index__title" id="catalogue">
        Каталог
      </h2>
      <Catalogue items={catalogueItems} />
    </div>
  );
};
