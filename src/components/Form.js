import Input from "./Input";
import Button from "./Button";
import Element from "./Element";
import Checkbox from "./Checkbox";
import Post from "./Post";

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
    this.createElementPostBox("postBox");
  }

  createElementPostBox(elementId) {
    this.postBox = document.createElement("div");
    this.postBox.id = elementId;
  }

  onSubmit = () => {
    if (this.input.value) {
      new Post({
        parentId: this.postBox.id,
        value: this.input.value,
        flag: this.checkbox.status,
        elementId: `post-${new Date().getTime()}`,
      }).render();
      this.input.value = "";
    }
  };

  initForm() {
    this.parentId.appendChild(this.element);
  }

  render() {
    this.btn.render();
    this.btn.click(this.onSubmit);
    this.input.render();
    this.checkbox.render();
    this.element.appendChild(this.postBox);
  }
}
