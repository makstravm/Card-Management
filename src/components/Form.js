import Input from "./Input";
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
    new Button({
      text: "Button",
      parentId: this.element.id,
      type: "button",
      elementId: "buttonId",
    }).render();
    new Input({
      text: "Enter text",
      parentId: this.element.id,
      type: "text",
      elementId: "textId",
    }).render();
  }
}
