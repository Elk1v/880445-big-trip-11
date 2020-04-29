
import EditedEventComponent from "../components/edit-event/edit-event";
import EventItemComponent from "../components/event-item/event-item";
import {render, replace} from "../utils/render";
import {RenderPosition} from "../mock/data";
import {EscButton} from "../consts";

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;

    this._eventEditComponent = null;
    this._eventItemComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._onDataChange = onDataChange;
  }

  render(event) {
    this._eventEditComponent = new EditedEventComponent();
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

    render(this._container, this._eventItemComponent, RenderPosition.BEFOREEND);
  }

  _replaceEditToEvent() {
    replace(this._eventItemComponent, this._eventEditComponent);
  }

  _replaceEventToEdit() {
    replace(this._eventEditComponent, this._eventItemComponent);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === EscButton.ESCAPE || evt.key === EscButton.ESC;

    if (isEscKey) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

