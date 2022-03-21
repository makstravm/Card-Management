import Checkbox from "./Checkbox";

export default class Post {
  constructor({ parentId, value, flag, elementId }) {
    this.createElement(elementId, value);
    this.parentId = parentId;
    this.checkbox = new Checkbox({
      parentId: elementId,
      elementId: `checkbox-${new Date().getTime()}`,
      flag,
    });
  }

  get parentElement() {
    return document.getElementById(this.parentId);
  }

  createElement(elementId, value) {
    this.element = document.createElement("div");
    this.element.id = elementId;
    this.element.innerHTML = `<span>${value}</span>`;
  }

  render() {
    this.parentElement.appendChild(this.element);
    this.checkbox.render();
  }
}
