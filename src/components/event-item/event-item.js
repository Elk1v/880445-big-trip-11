import AbstractComponent from "../abstract-component";
import {createEventItemTemplate} from "./event-item-tpl";

export default class EventItem extends AbstractComponent {
  constructor(eventItem) {
    super();
    this._eventItem = eventItem;
  }

  getTemplate() {
    return createEventItemTemplate(this._eventItem);
  }

  setRollupBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
