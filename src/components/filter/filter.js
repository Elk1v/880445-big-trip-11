import AbstractComponent from "../abstract-component";
import {createFilterTemplate} from "./filter-tpl";

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._Filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._Filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = evt.target.value;
      handler(filterName);
    });
  }
}
