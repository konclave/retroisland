import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { Document } from '@contentful/rich-text-types';
import type { Asset } from 'contentful';
import cx from 'classnames';
import { links as buttonPlayLinks } from '~/ui/shared/buttons/button-play';
import { getLinks } from '~/utils';

import styles from './catalogue-entry-about.css';
import desktopStyles from './catalogue-entry-about.d.css';
import { ContentfulPicture } from '~/ui/shared/contentful-picture';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...localLinks(), ...buttonPlayLinks()];

interface CatalogueEntryAboutProps {
  title: string;
  description?: Document;
  shortDescription?: string;
  images?: Asset[];
  tracksCount: number;
}

export const CatalogueEntryAbout = ({
  title,
  description,
  shortDescription,
  images,
  tracksCount,
}: CatalogueEntryAboutProps) => {
  // const joueleRef = useRef<any>(null);
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // function handlePlayClick() {
  //   const isPlaying = ($ as any).Jouele.playlist.forEach((pl: any) => {
  //     pl.forEach((track: any) => {
  //       track.pause();
  //     });
  //   });
  //
  //   if (!joueleRef.current) {
  //     joueleRef.current = ($ as any).Jouele.playlist[0][0].play();
  //     setIsPlaying(true);
  //   } else {
  //     if (joueleRef.current.isPlaying()) {
  //       joueleRef.current.pause();
  //       setIsPlaying(false);
  //     } else {
  //       joueleRef.current.play();
  //       setIsPlaying(true);
  //     }
  //   }
  // }

  return (
    <article className="catalogue-item-about padded-wrap">
      <div className="catalogue-item-about__images">
        {images?.map((image) => (
          <ContentfulPicture
            key={image.fields.file.url}
            src={image.fields.file.url}
            config={[
              { media: 'default', width: 480 },
              { media: '(min-width: 480px)', width: 453 },
            ]}
            title={image.fields.title || title}
          />
        ))}
      </div>
      {shortDescription && (
        <h3 className="catalogue-item-about__person-desc">
          {shortDescription}
        </h3>
      )}
      <h2
        className={cx('catalogue-item-about__name', {
          'catalogue-item-about__name_xx-long': title.length > 25,
        })}
      >
        {title}
      </h2>
      {description && (
        <main className="catalogue-item-about__text catalogue-item-about__text">
          {documentToReactComponents(description)}
        </main>
      )}
      {/*{tracksCount > 0 && (
        <span className="catalogue-item-about__play-btn">
          <ButtonPlay onClick={handlePlayClick} isPlaying={isPlaying}>
            Воспроизвести
          </ButtonPlay>
        </span>
      )}*/}
    </article>
  );
};
