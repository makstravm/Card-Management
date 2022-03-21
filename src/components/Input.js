import Element from "./Element";

export default class Input extends Element {
  constructor(data) {
    super(data, "input");
    this.element.placeholder = data.text;
  }
}
