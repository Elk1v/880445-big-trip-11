import {createDestinationAndPriceTemplate} from "./components/destintaion-and-price.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createSortFormTemplate} from "./components/sort-form.js";
import {createEventFormTempalte} from "./components/event-form";
import {createTripDaysTemplate} from "./components/trip-days";
import {createEventItemTemplate} from "./components/event-item.js";

const EVENT_COUNT = 3;

const pageHeaderElement = document.querySelector(`.page-header`);
const pageMain = document.querySelector(`.page-main`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
const tripMainControlsFirstHeaderElement = tripMainElement.querySelector(`.trip-main__trip-controls > h2:first-child`);
const tripMainControlsSecondHeaderElement = tripMainElement.querySelector(`.trip-main__trip-controls > h2:nth-child(2)`);
const tripEventsElement = pageMain.querySelector(`.trip-events`);

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

renderTemplate(tripMainElement, createDestinationAndPriceTemplate(), `afterbegin`);
renderTemplate(tripMainControlsFirstHeaderElement, createMenuTemplate(), `afterend`);
renderTemplate(tripMainControlsSecondHeaderElement, createFilterTemplate(), `afterend`);
renderTemplate(tripEventsElement, createSortFormTemplate(), `beforeend`);
renderTemplate(tripEventsElement, createEventFormTempalte(), `beforeend`);
renderTemplate(tripEventsElement, createTripDaysTemplate(), `beforeend`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  renderTemplate(tripEventsListElement, createEventItemTemplate(), `beforeend`);
}
