
import TripInfoComponent from "./components/trip-info/trip-info";
import MenuComponent from "./components/menu/menu";
import FilterComponent from "./components/filter/filter";
import SortFormComponent from "./components/sort-form/sort-form";
// import CreatedEventComponent from "./components/create-event/create-event"; использовать позже
// import EditedEventComponent from "./components/edit-event/edit-event";
import TripDaysComponent from "./components/trip-days/trip-days";
// import EventItemComponent from "./components/event-item/event-item";
import TripController from "./controllers/trip-controller";
import {render} from "./utils/render";
import {generateDate} from "./mock/trip-days";
import {generateEventItems} from "./mock/event-item";
import {CountedElement} from "./mock/data";
import {RenderPosition} from "./mock/data";

const pageHeaderElement = document.querySelector(`.page-header`);
const pageMain = document.querySelector(`.page-main`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsFirstHeaderElement = tripMainElement.querySelector(`.trip-main__trip-controls > h2:first-child`);
const tripMainControlsSecondHeaderElement = tripMainElement.querySelector(`.trip-main__trip-controls > h2:nth-child(2)`);
const tripEventsElement = pageMain.querySelector(`.trip-events`);

const date = generateDate();
const eventItems = generateEventItems(CountedElement.EVENT);

render(tripMainElement, new TripInfoComponent(), RenderPosition.AFTERBEGIN);
render(tripMainControlsFirstHeaderElement, new MenuComponent(), RenderPosition.AFTEREND);
render(tripMainControlsSecondHeaderElement, new FilterComponent(), RenderPosition.AFTEREND);
render(tripEventsElement, new SortFormComponent(), RenderPosition.BEFOREEND);
render(tripEventsElement, new TripDaysComponent(date), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

const tripController = new TripController(tripEventsListElement);

tripController.render(eventItems);
