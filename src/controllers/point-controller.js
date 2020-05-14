import EditedPointComponent from "../components/edit-event/edit-event";
import PointItemComponent from "../components/event-item/event-item";
import {render, replace, remove} from "../utils/render";
import {RenderPosition, getOffersList} from "../mock/data";
import {EscButton} from "../consts";
import moment from "moment";

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

export const EmptyPoint = {
  id: String(Date.now() + Math.random()),
  eventType: `Taxi`,
  offers: getOffersList(),
  basePrice: 0,
  destination: {
    name: ``,
    description: ``,
    picture: ``,
  },
  isFavorite: false,
  dateFrom: moment(),
  dateTo: moment(),
};
export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._pointEditComponent = null;
    this._pointItemComponent = null;
  }

  render(point, mode) {

    const oldPointItemComponent = this._pointItemComponent;
    const oldPointEditComponent = this._pointEditComponent;
    this._mode = mode;
    this._pointEditComponent = new EditedPointComponent(point);
    this._pointItemComponent = new PointItemComponent(point);

    this._pointItemComponent.setRollupBtnClickHandler(() => {
      this._replacePointToEdit();

      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._pointEditComponent.setRollupBtnClickHandler(() => {
      this.setDefaultView();
    });

    this._pointEditComponent.setSaveBtnClickHandler((evt) => {
      evt.preventDefault();
      const data = this._pointEditComponent.getData();
      this._onDataChange(this, point, data);
    });

    this._pointEditComponent.setDeleteBtnClickHandler(() => this._onDataChange(this, point, null));

    switch (mode) {
      case Mode.DEFAULT:
        if (oldPointItemComponent && oldPointEditComponent) {
          replace(this._pointItemComponent, oldPointItemComponent);
          replace(this._pointEditComponentm, oldPointEditComponent);
        } else {
          render(this._container, this._pointItemComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldPointItemComponent && oldPointEditComponent) {
          remove(oldPointItemComponent);
          remove(oldPointEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._pointEditComponent, RenderPosition.AFTERBEGIN);
        break;
    }
  }


  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToPoint();
    }
  }

  destroy() {
    remove(this._pointItemComponent);
    remove(this._pointEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToPoint() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._pointEditComponent.reset();
    if (document.contains(this._pointEditComponent.getElement())) {
      replace(this._pointItemComponent, this._pointEditComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _replacePointToEdit() {
    this._onViewChange();
    replace(this._pointEditComponent, this._pointItemComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === EscButton.ESCAPE || evt.key === EscButton.ESC;

    if (isEscKey) {
      this._replaceEditToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

