import { CatalogueEntryDto } from '~/data-fetch';
import { getLinks } from '~/utils';

import styles from './catalogue-entry.css';
import desktopStyles from './catalogue-entry.d.css';

import {
  CatalogueEntryAbout,
  links as aboutLinks,
} from './catalogue-entry-about';
import {
  Aknowledgements,
  links as acknowledgementsLinks,
} from './acknowledgements';
import { Videos, links as videosLinks } from './videos';
import {
  AdditionalInfo,
  links as additionalInfoLinks,
} from './additional-info';
import { Gallery, links as galleryLinks } from './gallery';

import { Albums, links as albumLinks } from './albums';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [
  ...localLinks(),
  ...aboutLinks(),
  ...acknowledgementsLinks(),
  ...videosLinks(),
  ...additionalInfoLinks(),
  ...albumLinks(),
  ...galleryLinks(),
];

interface CatalogueEntryProps {
  entry: CatalogueEntryDto;
}

export const CatalogueEntry = ({ entry }: CatalogueEntryProps) => {
  return (
    <section className="catalogue-item">
      <CatalogueEntryAbout
        title={entry.title}
        description={entry.description}
        image={entry.images?.at(0)}
        shortDescription={entry.shortDescription}
      />
      <div className="catalogue-main-container padded-wrap">
        <div className="catalogue-tracks-container">
          <Albums entries={entry.albums} />
          <div className="catalogue-tracks-container__side-panel">
            <Aknowledgements entries={entry.acknowledgements} />
            <Videos entries={entry.videos} />
          </div>
          <Gallery images={entry.images?.slice(1)} />
          <AdditionalInfo entries={entry.links} />
        </div>
      </div>
    </section>
  );
};
