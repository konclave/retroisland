let catalogueItems;

export function init() {
  const searchForm = document.querySelector('.catalogue-form');
  catalogueItems = document.querySelectorAll('.catalogue__item');

  if (!searchForm) {
    return;
  }

  const searchInput = searchForm.querySelector('.catalogue-form__search-input');
  const sortByType =  searchForm.querySelector('#catalogue-sort-type');
  const sortOrder =  searchForm.querySelector('#catalogue-order');

  searchInput && searchInput.addEventListener('input', handleSearchChange);
  sortByType && sortByType.addEventListener('change', handleSortTypeChange);
  sortOrder && sortOrder.addEventListener('change', handleSortOrderChange);
}

function handleSearchChange(event) {
  const needle = event.target.value;
  const catalogue = document.querySelector('.catalogue');
  const filtered = Array.from(catalogueItems).filter((item) =>
    item.querySelector('.catalogue-entry__title').textContent.toLowerCase().includes(needle.toLowerCase())
  );
  if (filtered.length === 0) {
    // Show empty list caption
  }
  catalogue.replaceChildren(...filtered);
}

function handleSortTypeChange() {}

function handleSortOrderChange() {}
