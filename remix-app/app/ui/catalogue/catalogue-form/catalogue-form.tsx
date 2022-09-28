import { BREAKPOINT_DESKTOP } from '~/config';
import styles from './catalogue-form.css';
import desktopStyles from './catalogue-form.d.css';

export const links = () => [
  { rel: 'stylesheet', href: styles },
  {
    rel: 'stylesheet',
    href: desktopStyles,
    media: `(min-width: ${BREAKPOINT_DESKTOP})`,
  },
];

interface CatalogueFormProps {
  onSearch: (needle: string) => void;
}

export const CatalogueForm = ({ onSearch }: CatalogueFormProps) => {
  function handleSearchChange(e: React.ChangeEvent) {
    const needle = e.target.value;
    onSearch(needle);
  }

  return (
    <form className="catalogue-form">
      <div className="catalogue-form__group">
        <input
          className="catalogue-form__search-input"
          type="text"
          placeholder="Поиск исполнителя"
          inputMode="search"
          onChange={handleSearchChange}
        />
      </div>
      {/* <div className="catalogue-form__group">
          <select placeholder="Тип" className="catalogue-form__sort-input" id="catalogue-sort-type">
              <option>Плейлисты</option>
              <option>Исполнители</option>
          </select>
          <select placeholder="Сортировать" className="catalogue-form__sort-input" id="catalogue-order">
              <option>По дате добавления</option>
              <option>А→Я</option>
              <option>Я→А</option>
          </select>
      </div> */}
    </form>
  );
};
