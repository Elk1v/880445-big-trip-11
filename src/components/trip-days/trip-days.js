import AbstractComponent from "../abstract-component";
import {createTripDaysTemplate} from "./trip-days-tpl";

export default class Day extends AbstractComponent {
  constructor(days) {
    super();

    this._days = days;
  }

  getTemplate() {
    return createTripDaysTemplate(this._days);
  }
}


