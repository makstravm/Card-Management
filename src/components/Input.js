import Element from "./Element";

export default class Input extends Element {
  constructor(data) {
    super(data, "input");
    this.element.type = data.type;
    this.element.placeholder = data.text;
    this.element.value = "";
  }

  get value() {
    return this.element.value;
  }

  set value(text) {
    this.element.value = text;
  }
}
