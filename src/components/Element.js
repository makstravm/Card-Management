export default class Element {
  constructor({ parentId, elementId }, el) {
    this.createElement(elementId, el);
    this.parentId = parentId;
  }

  get parentElement() {
    return document.getElementById(this.parentId);
  }

  createElement(elementId, el) {
    this.element = document.createElement(el);
    this.element.id = elementId;
  }

  render() {
    this.parentElement.appendChild(this.element);
  }
}
