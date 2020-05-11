import PointController from "./point-controller";

const renderEvents = (container, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange);
    pointController.render(event);

    return pointController;
  });
};

export default class TripController {
  constructor(container, pointModel) {
    this._container = container;
    this._pointModel = pointModel;
    this._showingPointsCount = 10;

    this._showedPointControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._pointModel.setFilterChangeHandler(this._onFilterChange);
  }


  render() {
    const points = this._pointModel.getPoints();

    this._renderPoints(points.slice(0, this._showingPointsCount));
  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => pointController.destroy());
    this._showedPointControllers = [];
  }

  rerender() {
    this._removePoints();
    this.render();
  }

  _renderPoints(points) {
    const newPoints = renderEvents(this._container, points, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newPoints);
    this._showingPointCount = this._showedPointControllers.length;
  }

  _onDataChange(pointController, oldData, newData) {
    const isSuccess = this._pointModel.updatePoint(oldData.id, newData);

    if (isSuccess) {
      pointController.render(newData);
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this.rerender();
  }
}
