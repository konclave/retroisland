import { getLinks } from '~/utils';
import styles from './acknowledgements.css';
import desktopStyles from './acknowledgements.d.css';

export const links = getLinks(styles, desktopStyles);

interface AknowledgementsProps {
  entries?: string[];
}

export const Aknowledgements = ({ entries }: AknowledgementsProps) => {
  if (!entries?.length) {
    return null;
  }
  return (
    <article className="catalogue-item-acknowledgements content-section">
      <h2 className="catalogue-item-acknowledgements__title section-title">
        Благодарности
      </h2>
      <p className="catalogue-item-acknowledgements__text">
        За выложенные песни огромное спасибо людям, которые их сохранили, нашли
        и поделились ими!
      </p>
      <ul className="acknowledgements-list">
        {entries.map((entry) => (
          <li
            className="acknowledgements-list__item"
            key={entry.replace(' ', '')}
          >
            {entry}
          </li>
        ))}
      </ul>
    </article>
  );
};
