import Button from "./Button";

export default class Form {
  constructor() {
    this.id = "formId";
    this.btn = new Button("Button", this.id, "button", "buttonId");
    this.root = document.getElementById("root");
  }

  createElement() {
    const element = document.createElement("form");
    element.id = this.id;
    return element;
  }

  initForm() {
    this.root.appendChild(this.createElement());
  }

  render() {
    this.btn.render();
  }
}
