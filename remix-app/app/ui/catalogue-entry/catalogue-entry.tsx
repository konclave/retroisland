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

const GALLERY_IMAGES_START = 5;

export const CatalogueEntry = ({ entry }: CatalogueEntryProps) => {
  const images =
    (entry.images?.length || 0) > GALLERY_IMAGES_START
      ? entry.images?.slice(0, 1)
      : entry.images;
  const restImages =
    (entry.images?.length || 0) > GALLERY_IMAGES_START
      ? entry.images?.slice(1)
      : undefined;
  return (
    <section className="catalogue-item">
      <CatalogueEntryAbout
        title={entry.title}
        description={entry.description}
        images={images}
        shortDescription={entry.shortDescription}
        tracksCount={entry.albums?.length || 0}
      />
      <div className="catalogue-main-container padded-wrap">
        <div className="catalogue-tracks-container">
          <Albums entries={entry.albums} />
          <div className="catalogue-tracks-container__side-panel">
            <Aknowledgements entries={entry.acknowledgements} />
            <Videos entries={entry.videos} />
          </div>
          <Gallery images={restImages} />
          <AdditionalInfo entries={entry.links} />
        </div>
      </div>
    </section>
  );
};
