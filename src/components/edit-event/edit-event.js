import AbstractComponent from "../abstract-component";
import {editEventTemplate} from "./edit-event-tpl";

export default class EditedEvent extends AbstractComponent {
  getTemplate() {
    return editEventTemplate(this._eventItem);
  }

  setRollupBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
