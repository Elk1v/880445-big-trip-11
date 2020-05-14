import AbstractSmartComponent from "../abstract-smart-component";
import {editEventTemplate} from "./edit-event-tpl";
import {parseFormData} from "./edit-event-tpl";

export default class EditedEvent extends AbstractSmartComponent {
  constructor(eventItem) {
    super();

    this._eventItem = eventItem;

    this._eventType = eventItem.eventType;
    this._dateFrom = eventItem.dateFrom;
    this._dateTo = eventItem.dateTo;
    this._destination = eventItem.destination;
    this._offers = eventItem.offers;
    this._isFavorite = eventItem.isFavorite;
    this._basePrice = eventItem.basePrice;

    this._saveHandler = null;
    this._deleteHandler = null;
    this._rollupHandler = null;
    this._favoriteHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return editEventTemplate(this._eventItem, {
      eventType: this._eventType,
      dateFrom: this._dateFrom,
      dateTo: this._dateTo,
      destination: this._destination,
      offers: this._offers,
      isFavorite: this._isFavorite,
    });
  }

  recoveryListeners() {
    this.setRollupBtnClickHandler(this._saveHandler);
    this.setRollupBtnClickHandler(this._rollupHandler);
    this.setDeleteBtnClickHandler(this._deleteHandler);
    this.setFavoriteBtnClickHandler(this._favoriteHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    /*  this._applyFlatpickr(); */
  }

  removeElement() {
    /*
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }
    */
    super.removeElement();
  }

  reset() {
    const eventItem = this._eventItem;
    this._eventType = eventItem.eventType;
    this._dateFrom = eventItem.dateFrom;
    this._dateTo = eventItem.dateTo;
    this._destination = eventItem.destination;
    this._offers = eventItem.offers;
    this._isFavorite = eventItem.isFavorite;
    this._basePrice = eventItem.basePrice;
    this.rerender();
  }

  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    const formData = new FormData(form);
    return parseFormData(formData);
  }

  setSaveBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__save-btn`)
      .addEventListener(`click`, handler);

    this._saveHandler = handler;
  }

  setDeleteBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteHandler = handler;
  }

  setRollupBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);

    this._rollupHandler = handler;
  }

  setFavoriteBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);

    this._favoriteHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelectorAll(`.event__type-input`).forEach((type) => {
      type.addEventListener(`change`, (evt) => {
        if (!evt.target) {
          return;
        }
        this._eventType = evt.target.value;
        this.rerender();
      });
    });

    element.querySelector(`.event__input--price`).addEventListener(`change`, (evt) => {
      this._basePrice = Number(evt.target.value);
    });

    element.querySelector(`.event__favorite-btn`)
    .addEventListener(`click`, () => {
      this._isFavorite = !this._isFavorite;
      this.rerender();
    });
  }
}
