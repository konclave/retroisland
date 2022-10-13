import { getLinks } from '~/utils';

import styles from './image.css';

export const links = getLinks(styles);

interface ImageProps {
  title?: string;
  src: string;
}

export const Image = ({ title, src }: ImageProps) => {
  return (
    <div className="image-box">
      <img className="image-box__image" src={src} alt={title || ''} />
      {title && <small className="image-box__caption">{title}</small>}
    </div>
  );
};
