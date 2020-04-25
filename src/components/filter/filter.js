import AbstractComponent from "../abstract-component";
import {createFilterTemplate} from "./filter-tpl";

export default class Filter extends AbstractComponent {
  getTemplate() {
    return createFilterTemplate();
  }
}
