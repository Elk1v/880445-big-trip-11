import PointController from "./point-controller";

const renderEvents = (container, events, onDataChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange);
    pointController.render(event);

    return pointController;
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._events = [];

    this._showedPointControllers = [];

    this._onDataChange = this._onDataChange.bind(this);
  }


  render(events) {
    this._events = events;

    const allEvents = renderEvents(this._container, this._events, this._onDataChange);

    this._showedPointControllers.concat(allEvents);
  }

  _onDataChange(oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    this._showedPointControllers.render(this._events[index]);
  }
}
