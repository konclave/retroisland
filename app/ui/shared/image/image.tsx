import { getLinks } from '~/utils';
import { ContentfulPicture } from '../contentful-picture';

import styles from './image.css';
import desktopStyles from './image.d.css';

export const links = getLinks(styles, desktopStyles);

interface ImageProps {
  title?: string;
  src: string;
}

export const Image = ({ title, src }: ImageProps) => {
  return (
    <div className="image-box">
      <ContentfulPicture
        src={src}
        title={title || ''}
        config={[
          { media: 'default', width: 480 },
          { media: '(min-width: 480px)', width: 800 },
          { media: '(min-width: 800px)', width: 630 },
        ]}
        className="image-box__image"
      />
      {title && <small className="image-box__caption">{title}</small>}
    </div>
  );
};
