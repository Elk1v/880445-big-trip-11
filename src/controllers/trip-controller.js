import PointController from "./point-controller";

const renderEvents = (container, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(container, onDataChange, onViewChange);
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
    this._onViewChange = this._onViewChange.bind(this);
  }


  render(events) {
    this._events = events;
    const allEvents = renderEvents(this._container, this._events, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(allEvents);
  }

  _onDataChange(oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    this._showedPointControllers.render(this._events[index]);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((it) => it.setDefaultView());
  }
}
