import { IconNext } from '~/ui/shared/icons/icon-next';
import { getLinks } from '~/utils';

import styles from './communities-item.css';
import desktopStyles from './communities-item.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...localLinks()];

interface CommunitiesItemProps {
  title?: string;
  description?: string;
  link?: string;
}

export const CommunitiesItem = ({
  title,
  description,
  link,
}: CommunitiesItemProps) => {
  return (
    <article className="community">
      <a target="_blank" rel="nofollow, noindex, noreferrer" href={link}>
        <h3 className="community__title">{title}</h3>
        <p className="community__text">{description}</p>

        <span className="community__link">
          <IconNext />
        </span>
      </a>
    </article>
  );
};
