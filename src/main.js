import {EVENT_COUNT} from "./data.js";
import {renderTemplate} from "./utils.js";
import {createDestinationAndPriceTemplate} from "./components/destintaion-and-price.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createSortFormTemplate} from "./components/sort-form.js";
import {createEventFormTempalte} from "./components/event-form.js";
import {createTripDaysTemplate} from "./components/trip-days.js";
import {createEventItemTemplate} from "./components/event-item.js";
import {generateDate} from "./mock/trip-days.js";
import {generateEvents, generateEvent} from "./mock/event-item.js";

const pageHeaderElement = document.querySelector(`.page-header`);
const pageMain = document.querySelector(`.page-main`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsFirstHeaderElement = tripMainElement.querySelector(`.trip-main__trip-controls > h2:first-child`);
const tripMainControlsSecondHeaderElement = tripMainElement.querySelector(`.trip-main__trip-controls > h2:nth-child(2)`);
const tripEventsElement = pageMain.querySelector(`.trip-events`);

const date = generateDate();
const event = generateEvent();
const events = generateEvents(EVENT_COUNT);

renderTemplate(tripMainElement, createDestinationAndPriceTemplate(), `afterbegin`);
renderTemplate(tripMainControlsFirstHeaderElement, createMenuTemplate(), `afterend`);
renderTemplate(tripMainControlsSecondHeaderElement, createFilterTemplate(), `afterend`);
renderTemplate(tripEventsElement, createSortFormTemplate(), `beforeend`);
renderTemplate(tripEventsElement, createEventFormTempalte(event), `beforeend`);
renderTemplate(tripEventsElement, createTripDaysTemplate(date), `beforeend`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

events.slice(1, 10)
.forEach((eventItem) => renderTemplate(tripEventsListElement, createEventItemTemplate(eventItem), `beforeend`));
