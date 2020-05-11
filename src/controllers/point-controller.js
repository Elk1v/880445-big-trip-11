import EditedEventComponent from "../components/edit-event/edit-event";
import EventItemComponent from "../components/event-item/event-item";
import {render, replace, remove} from "../utils/render";
import {RenderPosition} from "../mock/data";
import {EscButton} from "../consts";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._eventEditComponent = null;
    this._eventItemComponent = null;
  }

  render(event) {

    const oldEventItemComponent = this._eventItemComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._eventEditComponent = new EditedEventComponent(event);
    this._eventItemComponent = new EventItemComponent(event);

    this._eventItemComponent.setRollupBtnClickHandler(() => {
      this._replaceEventToEdit();

      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._eventEditComponent.setRollupBtnClickHandler(() => {
      this._replaceEditToEvent();
    });

    this._eventEditComponent.setSaveBtnClickHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
    });

    this._eventEditComponent.setFavoriteBtnClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });
    if (oldEventItemComponent && oldEventEditComponent) {
      replace(this._eventItemComponent, oldEventItemComponent);
      replace(this._eventEditComponentm, oldEventEditComponent);
    } else {
      render(this._container, this._eventItemComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._eventItemComponent);
    remove(this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replaceEditToEvent() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditComponent.reset();
    replace(this._eventItemComponent, this._eventEditComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventItemComponent);
    this._mode = Mode.EDIT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === EscButton.ESCAPE || evt.key === EscButton.ESC;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

