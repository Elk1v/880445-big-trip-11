import AbstractComponent from "../abstract-component";
import {createEventFormTemplate} from "./create-event-tpl";

export default class CreatedEvent extends AbstractComponent {
  constructor(eventItem) {
    super();

    this._eventItem = eventItem;
  }

  getTemplate() {
    return createEventFormTemplate(this._eventItem);
  }
}
