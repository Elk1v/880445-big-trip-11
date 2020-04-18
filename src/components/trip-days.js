import {createElement} from "../utils.js";

const createTripDaysTemplate = (date) => {
  const {dateTime, dayCounter, day} = date;

  return (
    `<ul class="trip-days">
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayCounter}</span>
          <time class="day__date" datetime="${dateTime}">${day}</time>
        </div>
        <ul class="trip-events__list"></ul>
        </li>
        </ul>
        `
  );
};

export default class Day {
  constructor(days) {
    this._days = days;
    this._element = null;
  }

  getTemplate() {
    return createTripDaysTemplate(this._days);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


