import AbstractComponent from "../abstract-component";
import {createMenuTemplate} from "./menu-tpl";

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }
}
