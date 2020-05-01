import AbstractSmartComponent from "../abstract-smart-component";
import {editEventTemplate} from "./edit-event-tpl";

export default class EditedEvent extends AbstractSmartComponent {
  constructor(eventItem) {
    super();

    this._eventItem = eventItem;

    this._saveHandler = null;
    this._rollupHandler = null;
    this._favoriteHandler = null;

    this._eventType = this._eventItem.randomEventType;

    this._subscribeOnEvents();
  }
  getTemplate() {
    return editEventTemplate(this._eventItem, this._eventType);
  }

  recoveryListeners() {
    this.setRollupBtnClickHandler(this._saveHandler);
    this.setRollupBtnClickHandler(this._rollupHandler);
    this.setFavoriteBtnClickHandler(this._favoriteHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._eventItem = this._eventItem;
    this._eventType = this._eventType;

    this.rerender();
  }

  setSaveBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__save-btn`)
      .addEventListener(`click`, handler);

    this._saveHandler = handler;
  }

  setRollupBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);

    this._rollupHandler = handler;
  }

  setFavoriteBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);

    this._rollupHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelectorAll(`.event__type-input`).forEach((it) => {
      it.addEventListener(`change`, (evt) => {
        this._eventType = evt.target.value;

        this.rerender();
      });
    });
  }
}
