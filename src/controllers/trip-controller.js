import PointController from "./point-controller";
import {EmptyPoint, Mode} from "./point-controller";
import {RenderPosition} from "../mock/data";
import {render} from "../utils/render";

const renderEvents = (container, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange);
    pointController.render(event, Mode.DEFAULT);

    return pointController;
  });
};

export default class TripController {
  constructor(container, pointModel) {
    this._container = container;
    this._pointModel = pointModel;
    this._showedPointControllers = [];
    this._creatingPoint = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._renderPoints(this._pointModel.getPoints());
    /* renderDays */
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._creatingPoint = new PointController(this._container, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, Mode.ADDING);
  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  _updatePoints() {
    this._removePoints();
    this.render();
  }

  _renderPoints(points) {
    const newPoints = renderEvents(this._container, points, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newPoints);
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointModel.addPoint(newData);
        pointController.render(newData, Mode.DEFAULT);

        this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
      }
    } else if (newData === null) {
      this._pointModel.removePoint(oldData.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointModel.updatePoint(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData, Mode.DEFAULT);
      }
    }
  }
  /* _onSortTypeChange {}*/

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._updatePoints();
  }
}
