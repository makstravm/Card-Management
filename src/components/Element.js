export default class Element {
  constructor({ parentId, type, elementId }, el) {
    this.createElement(type, elementId, el);
    this.parentId = parentId;
  }

  get parentElement() {
    return document.getElementById(this.parentId);
  }

  createElement(type, elementId, el) {
    this.element = document.createElement(el);
    this.element.type = type;
    this.element.id = elementId;
  }

  render() {
    this.parentElement.appendChild(this.element);
  }
}
