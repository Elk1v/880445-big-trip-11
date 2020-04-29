import AbstractComponent from "../abstract-component";
import {editEventTemplate} from "./edit-event-tpl";

export default class EditedEvent extends AbstractComponent {
  getTemplate() {
    return editEventTemplate();
  }

  setSaveBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__save-btn`)
      .addEventListener(`click`, handler);
  }

  setRollupBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }

  setFavoriteBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
  }
}
