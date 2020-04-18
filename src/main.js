
import TripInfoComponent from "./components/destintaion-and-price.js";
import MenuComponent from "./components/menu.js";
import FilterComponent from "./components/filter.js";
import SortFormComponent from "./components/sort-form.js";
// import CreatedEventComponent from "./components/create-event.js"; использовать позже
import EditedEventComponent from "./components/edit-event.js";
import TripDaysComponent from "./components/trip-days.js";
import EventItemComponent from "./components/event-item.js";
import {renderTemplate} from "./utils.js";
import {generateDate} from "./mock/trip-days.js";
import {generateEventItems} from "./mock/event-item.js";
import {countedElement} from "./mock/data.js";
import {RenderPosition} from "./mock/data.js";

const escButton = {// перенести в Data
  ESC: `Esc`,
  ESCAPE: `Escape`,
};

const pageHeaderElement = document.querySelector(`.page-header`);
const pageMain = document.querySelector(`.page-main`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsFirstHeaderElement = tripMainElement.querySelector(`.trip-main__trip-controls > h2:first-child`);
const tripMainControlsSecondHeaderElement = tripMainElement.querySelector(`.trip-main__trip-controls > h2:nth-child(2)`);
const tripEventsElement = pageMain.querySelector(`.trip-events`);

const date = generateDate();
const eventItems = generateEventItems(countedElement.EVENT);

const renderEvent = (tripEventsListElement, eventItem) => {
  const eventEditComponent = new EditedEventComponent();

  const replaceEventToEdit = () => {
    tripEventsListElement.replaceChild(eventEditComponent.getElement(), eventItemComponent.getElement());
  };

  const replaceEditToEvent = () => {
    tripEventsListElement.replaceChild(eventItemComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === escButton.ESCAPE || evt.key === escButton.ESC;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventItemComponent = new EventItemComponent(eventItem);

  const rollupBtn = eventItemComponent.getElement().querySelector(`.event__rollup-btn`);
  rollupBtn.addEventListener(`click`, () => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  renderTemplate(tripEventsListElement, eventItemComponent.getElement(), RenderPosition.BEFOREEND);
};

renderTemplate(tripMainElement, new TripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);
renderTemplate(tripMainControlsFirstHeaderElement, new MenuComponent().getElement(), RenderPosition.AFTEREND);
renderTemplate(tripMainControlsSecondHeaderElement, new FilterComponent().getElement(), RenderPosition.AFTEREND);
renderTemplate(tripEventsElement, new SortFormComponent().getElement(), RenderPosition.BEFOREEND);

renderTemplate(tripEventsElement, new TripDaysComponent(date).getElement(), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

eventItems.slice(1, 10)
.forEach((eventItem) => {
  renderEvent(tripEventsListElement, eventItem);
});
