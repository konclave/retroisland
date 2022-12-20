import { IconNext } from '~/ui/shared/icons';
import { getLinks } from '~/utils';

import styles from './additional-info.css';
import desktopStyles from './additional-info.d.css';
import tabletStyles from './additional-info.tablet.css';

export const links = getLinks(styles, desktopStyles, tabletStyles);

interface AdditionalInfoProps {
  entries?: any[];
}

export const AdditionalInfo = ({ entries }: AdditionalInfoProps) => {
  if (!entries?.length) {
    return null;
  }

  return (
    <article className="catalogue-other content-section">
      <h2 className="catalogue-other__title section-title">Другие материалы</h2>
      <ul className="catalogue-links">
        {entries.map((entry) => (
          <li className="catalogue-links__item catalogue-link" key={entry.id}>
            <a
              target="_blank"
              rel="nofollow, noindex, noreferrer"
              href={entry.link}
            >
              <p className="catalogue-link__text">{entry.title}</p>
              <span className="catalogue-link__arrow link-arrow">
                <IconNext className="link-arrow__image" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
};
