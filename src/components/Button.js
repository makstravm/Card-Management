export default class Button {
  constructor(text, parentId, type, buttonId) {
    this.createElement(text, type, buttonId);
    this.parentId = parentId;
  }

  get parentElement() {
    return document.getElementById(this.parentId);
  }

  createElement(text, type, buttonId) {
    this.element = document.createElement("button");
    this.element.innerText = text;
    this.element.type = type;
    this.element.id = buttonId;
  }

  render() {
    this.parentElement.appendChild(this.element);
  }
}
