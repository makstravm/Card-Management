import Element from "./Element";

export default class Button extends Element {
  constructor(data) {
    super(data, "button");
    this.element.type = "button";
    this.element.innerText = data.text;
  }

  click(func) {
    this.element.onclick = () => func();
  }
}
