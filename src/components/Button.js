export default class Button {
  constructor(text, parentId, type, buttonId) {
    this.text = text;
    this.parentId = parentId;
    this.type = type;
    this.buttonId = buttonId;
  }

  get parentElement() {
    return document.getElementById(this.parentId);
  }

  createElement() {
    const btn = document.createElement("button");
    btn.innerText = this.text;
    btn.type = this.type;
    btn.id = this.buttonId;
    return btn;
  }

  render() {
    this.parentElement.appendChild(this.createElement());
  }
}
