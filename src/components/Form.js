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
    this.postBox = new Post({
      parentId: this.element.id,
      value: this.input.value,
      elementId: "postBox",
    });
  }

  onSubmit = () => {
    if (this.input.value) {
      new Post({
        parentId: "postBox",
        value: this.input.value,
        elementId: `post ${new Date().getTime()}`,
      }).render();

      new Checkbox({
        parentId: "postBox",
        elementId: `checkbox ${new Date().getTime()}`,
        flag: this.checkbox.status,
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
    this.postBox.render();
  }
}
