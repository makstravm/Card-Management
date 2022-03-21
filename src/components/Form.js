import Input from "./Input";
import Button from "./Button";
import Element from "./Element";
import Checkbox from "./Checkbox";

export default class Form extends Element {
  constructor(data) {
    super(data, "form");
    this.parentId = data.parentId;
    this.btn = new Button({
      text: "Button",
      parentId: this.element.id,
      elementId: "buttonId",
    });
    this.input = new Input({
      text: "Enter text",
      parentId: this.element.id,
      type: "text",
      elementId: "textId",
    });
    this.checkbox = new Checkbox({
      parentId: this.element.id,
      elementId: "checkboxId",
      flag: true,
    });
  }

  initForm() {
    this.parentId.appendChild(this.element);
  }

  render() {
    this.btn.render();
    this.input.render();
    this.checkbox.render();
  }
}
