import AbstractComponent from "../abstract-component";
import {createSortFormTemplate} from "./sort-form-tpl";

export default class SortForm extends AbstractComponent {
  getTemplate() {
    return createSortFormTemplate();
  }
}

