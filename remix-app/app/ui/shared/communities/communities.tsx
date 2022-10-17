import { Link } from '@remix-run/react';

import { IconNext } from '~/ui/shared/icons/icon-next';
import { getLinks } from '~/utils';

import styles from './communities.css';
import desktopStyles from './communities.d.css';

const localLinks = getLinks(styles, desktopStyles);

export const links = () => [...localLinks()];

export const Communities = () => {
  return (
    <section className="communities">
      <h2 className="communities__title">Сообщества</h2>
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
    </section>
  );
};
