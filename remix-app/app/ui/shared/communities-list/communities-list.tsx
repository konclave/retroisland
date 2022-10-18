import { Link } from '@remix-run/react';

import { IconNext } from '~/ui/shared/icons/icon-next';
import { getLinks } from '~/utils';
import {
  CommunitiesItem,
  links as communitiesItemLinks,
} from '~/ui/shared/communities-item';

import { IOuterLink } from '~/types/generated/contentful';

import styles from './communities-list.css';
import desktopStyles from './communities-list.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...communitiesItemLinks(), ...localLinks()];

interface CommunitiesListProps {
  items: IOuterLink[];
}

export const CommunitiesList = ({ items }: CommunitiesListProps) => {
  return (
    <ul className="communities-list">
      {items.map((community: IOuterLink) => (
        <li className="communities-list__item" key={community.sys.id}>
          <CommunitiesItem
            title={community.fields.title}
            description={community.fields.description}
            link={community.fields.link}
          />
        </li>
      ))}
    </ul>
  );
};
