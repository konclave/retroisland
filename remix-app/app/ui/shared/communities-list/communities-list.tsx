import { Link } from '@remix-run/react';

import { IconNext } from '~/ui/shared/icons/icon-next';
import { getLinks } from '~/utils';
import {
  CommunitiesItem,
  links as communitiesItemLinks,
} from '~/ui/shared/communities-item';

import styles from './communities-list.css';
import desktopStyles from './communities-list.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...communitiesItemLinks(), ...localLinks()];

interface CommunitiesListProps {
  items: any;
}

export const CommunitiesList = ({ items }: CommunitiesListProps) => {
  console.log(items);
  return (
    <ul className="communities-list">
      <li className="communities-list__item">
        <article className="community">
          <h3 className="community__title">Форум «Ностальгия»</h3>
          <p className="community__text">
            Форум для любителей ретро-музыки. Можно найти новых друзей, старую
            музыку и многое другое.
          </p>
          <Link
            className="community__link"
            target="_blank"
            rel="nofollow, noindex, noreferrer"
            to="http://nostalgie30-80.com/forum/login.php?0"
          >
            <IconNext />
          </Link>
        </article>
      </li>
      <li className="communities-list__item">
        <article className="community">
          <h3 className="community__title">Гостевая книга</h3>
          <p className="community__text">
            Здесь говорят на разные темы, помогают в поиске старых записей
            для сайта, а так же можно поблагодарить автора.
          </p>
          <Link className="community__link" to="/">
            <IconNext />
          </Link>
        </article>
      </li>
    </ul>
  );
};
