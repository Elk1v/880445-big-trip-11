import FilterComponent from "../components/filter/filter";
import {render, replace} from "../utils/render";
import {RenderPosition} from "../mock/data";
import {FilterType} from "../consts";
import {getPointsByFilter} from "../utils/filter";

export default class FilterController {
  constructor(container, pointModel) {
    this._container = container;
    this._pointModel = pointModel;

    this._filterComponent = null;
    this._activeFilterType = FilterType.EVERYTHING;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  render() {
    const allPoints = this._pointModel.getAllPoints();

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        counts: getPointsByFilter(allPoints, filterType).length,
        isChecked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent, RenderPosition.AFTEREND);
    }
  }

  _onFilterChange(filterType) {
    this._pointModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
