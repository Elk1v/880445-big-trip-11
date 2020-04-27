import EditedEventComponent from "../components/edit-event/edit-event";
import EventItemComponent from "../components/event-item/event-item";
import {render, replace} from "../utils/render";
import {RenderPosition} from "../mock/data";
import {onEscKeyDown} from "../utils/common";

const TaskCount = {
  FROM: 1,
  TO: 10,
};

const renderEvent = (tripEventsListElement, eventItem) => {
  const eventEditComponent = new EditedEventComponent();
  const eventItemComponent = new EventItemComponent(eventItem);

  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventItemComponent);
  };

  const replaceEditToEvent = () => {
    replace(eventItemComponent, eventEditComponent);
  };

  eventItemComponent.setRollupBtnClickHandler(() => {
    replaceEventToEdit();

    document.addEventListener(`keydown`, (evt) => {
      onEscKeyDown(evt, replaceEditToEvent);
    });
  });

  eventEditComponent.setRollupBtnClickHandler(() => {
    replaceEditToEvent();
  });

  render(tripEventsListElement, eventItemComponent, RenderPosition.BEFOREEND);
};

const renderEvents = (events, container) => {
  events.slice(TaskCount.FROM, TaskCount.TO)
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
