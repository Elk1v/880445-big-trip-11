import EditedEventComponent from "../components/edit-event/edit-event";
import EventItemComponent from "../components/event-item/event-item";
import {render, replace} from "../utils/render";
import {RenderPosition} from "../mock/data";

const EscButton = {// перенести в Data
  ESC: `Esc`,
  ESCAPE: `Escape`,
};

const renderEvent = (tripEventsListElement, eventItem) => {
  const eventEditComponent = new EditedEventComponent();

  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventItemComponent);
  };

  const replaceEditToEvent = () => {
    replace(eventItemComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === EscButton.ESCAPE || evt.key === EscButton.ESC;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventItemComponent = new EventItemComponent(eventItem);

  eventItemComponent.setRollupBtnClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(tripEventsListElement, eventItemComponent, RenderPosition.BEFOREEND);
};

const renderEvents = (events, container) => {
  events.slice(1, 10)
    .forEach((event) => {
      renderEvent(container, event);
    });
};

export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render(events) {
    renderEvents(events, this._container);
  }
}
