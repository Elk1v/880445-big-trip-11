import AbstractComponent from "../abstract-component";
import {createTripInfoTemplate} from "./trip-info-tpl";

export default class TripInfo extends AbstractComponent {
  getTemplate() {
    return createTripInfoTemplate();
  }
}
