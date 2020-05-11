const capitalize = (s) => {
  if (typeof s !== `string`) {
    return ``;
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
};

const getFiltersMurkup = (filters) => {
  return filters.map((filter) => {
    return (
      `
      <div class="trip-filters__filter">
      <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${filter.isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${filter.name}">${capitalize(filter.name)}</label>
      </div>
      `
    );
  }).join(`\n`);
};

export const createFilterTemplate = (filters) => {
  return (
    `
      <form class="trip-filters" action="#" method="get">
        ${getFiltersMurkup(filters)}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `
  );
};
