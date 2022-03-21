import Element from "./Element";

export default class Post extends Element {
  constructor(data) {
    super(data, "div");
    this.element.innerText = data.value;
  }
}
