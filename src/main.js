
import TripInfoComponent from "./components/trip-info/trip-info";
import MenuComponent from "./components/menu/menu";
import SortFormComponent from "./components/sort-form/sort-form";
import TripDaysComponent from "./components/trip-days/trip-days";
import TripController from "./controllers/trip-controller";
import FilterController from "./controllers/filter-controller";
import PointModel from "./models/point";
import {render} from "./utils/render";
import {generateDate} from "./mock/trip-days";
import {generateEventItems} from "./mock/event-item";
import {CountedElement} from "./mock/data";
import {RenderPosition} from "./mock/data";

const pageHeaderElement = document.querySelector(`.page-header`);
const pageMain = document.querySelector(`.page-main`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControls = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = pageMain.querySelector(`.trip-events`);

const date = generateDate();
const eventItems = generateEventItems(CountedElement.EVENT);
const pointModel = new PointModel();
pointModel.setPoints(eventItems);

render(tripMainElement, new TripInfoComponent(), RenderPosition.AFTERBEGIN);
render(tripMainControls, new MenuComponent(), RenderPosition.AFTEREND);

render(tripEventsElement, new SortFormComponent(), RenderPosition.BEFOREEND);
render(tripEventsElement, new TripDaysComponent(date), RenderPosition.BEFOREEND);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

const filterController = new FilterController(tripMainControls, pointModel);
filterController.render();

const tripController = new TripController(tripEventsListElement, pointModel);
tripController.render(eventItems);

