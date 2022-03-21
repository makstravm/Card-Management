import Element from "./Element";

export default class Button extends Element {
  constructor(data) {
    super(data, "button");
    this.element.innerText = data.text;
  }
}
