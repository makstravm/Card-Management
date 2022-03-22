import Checkbox from "./Checkbox";
import Element from "./Element";

export default class Post extends Element {
  constructor(data) {
    super(data, "div");
    this.checkbox = new Checkbox({
      parentId: data.elementId,
      elementId: `checkbox-${new Date().getTime()}`,
      flag: data.flag,
    });
    this.element.innerHTML = `<span>${data.value}</span>`;
  }

  renderCheckbox() {
    this.checkbox.render();
  }
}
