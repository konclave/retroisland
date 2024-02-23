import { useState } from 'react';
import { BREAKPOINT_DESKTOP } from '~/config';
import type { CatalogueOrder } from '../catalogue';
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
  onOrderChange: (order: CatalogueOrder) => void;
}

export const CatalogueForm = ({
  onSearch,
  onOrderChange,
}: CatalogueFormProps) => {
  const [search, setSearch] = useState<string>('');
  const [order, setOrder] = useState<string>('');

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const needle = e.target.value;
    onSearch(needle);
    setSearch(needle);
  }

  function handleOrderChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const order = e.target.value as CatalogueOrder;
    onOrderChange(order);
    setOrder(order);
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
          value={search}
        />
      </div>
      <div className="catalogue-form__group">
        {/*<select
          placeholder="Тип"
          className="catalogue-form__sort-input"
          id="catalogue-sort-type"
        >
          <option>Плейлисты</option>
          <option>Исполнители</option>
        </select>*/}
        <select
          className="catalogue-form__sort-input"
          onChange={handleOrderChange}
          id="catalogue-order"
          value={order}
        >
          <option>Сортировать</option>
          <option value="createdAt">по дате добавления</option>
          <option value="titleDesc">по алфавиту А → Я</option>
          <option value="titleAsc">по алфавиту Я → А</option>
        </select>
      </div>
    </form>
  );
};
