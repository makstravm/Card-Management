export default class Input {
  constructor(el, type, value = "") {
    const inputEl = document.createElement("input");
    inputEl.type = type;
    this.value = value;
    el.appendChild(inputEl);
    inputEl.oninput = (newValue) => {
      this.value += newValue.data;
    };
  }

  get value() {
    return this.value;
  }

  set value(newValue) {
    this.value = newValue;
  }
}
