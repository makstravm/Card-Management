import Button from "./Button";

export default class Form {
  constructor(formId, parrentId) {
    this.createElement(formId);
    this.parrentId = parrentId;
  }

  createElement(formId) {
    this.element = document.createElement("form");
    this.element.id = formId;
  }

  initForm() {
    this.parrentId.appendChild(this.element);
  }

  render() {
    new Button("Button", this.element.id, "button", "buttonId").render();
  }
}
