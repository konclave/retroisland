import { useState } from 'react';

interface CatalogueEntry {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  createdAt: string;
}

interface Props {
  items: CatalogueEntry[];
  noFilter?: boolean;
}

type Order = 'createdAt' | 'titleAsc' | 'titleDesc';

export default function CatalogueWithFilter({ items, noFilter }: Props) {
  const [filtered, setFiltered] = useState<CatalogueEntry[] | null>(null);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const needle = e.target.value.trim().toLowerCase();
    setFiltered(needle.length > 2 ? items.filter((i) => i.title.toLowerCase().includes(needle)) : null);
  }

  function handleOrder(e: React.ChangeEvent<HTMLSelectElement>) {
    const list = [...(filtered ?? items)];
    const order = e.target.value as Order;
    if (order === 'createdAt') list.sort((a, z) => new Date(z.createdAt).getTime() - new Date(a.createdAt).getTime());
    else if (order === 'titleDesc') list.sort((a, z) => a.title.localeCompare(z.title, 'ru'));
    else if (order === 'titleAsc') list.sort((a, z) => z.title.localeCompare(a.title, 'ru'));
    setFiltered([...list]);
  }

  const display = filtered ?? items;

  return (
    <section className="padded-wrap inner-page-wrap">
      {!noFilter && (
        <div className="catalogue-form">
          <input
            className="catalogue-form__search"
            type="search"
            placeholder="Поиск..."
            onChange={handleSearch}
          />
          <select className="catalogue-form__order" onChange={handleOrder}>
            <option value="titleDesc">А–Я</option>
            <option value="titleAsc">Я–А</option>
            <option value="createdAt">По дате добавления</option>
          </select>
        </div>
      )}
      {display.length === 0 ? (
        <p className="catalogue-not-found">Ничего не найдено</p>
      ) : (
        <ul className="catalogue">
          {display.map((item) => (
            <li key={item.id} className="catalogue__item">
              <div className="catalogue-entry">
                <a href={`/catalogue/${item.slug}`}>
                  <h2 className="catalogue-entry__title">{item.shortTitle || item.title}</h2>
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
