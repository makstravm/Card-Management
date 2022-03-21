import Element from "./Element";

export default class Checkbox extends Element {
  constructor(data) {
    super(data, "input");
    this.element.type = "checkbox";
    this.element.checked = data.flag;
  }
}
