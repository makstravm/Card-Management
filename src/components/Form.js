import Button from "./Button";
import Input from "./Input";

const root = document.getElementById("root");
// root.innerHTML = "<h1>sdfsd</h1>";

class Form {
  constructor() {
    const formEl = document.createElement("div");
    this.input = new Input(formEl, "text");
    this.btn = new Button(formEl);
    console.log(this.btn);
    console.log(this.input.value);
    root.appendChild(formEl);
  }

  sentMessege() {
    console.log(1);
    return this.btn.click;
  }
}

const createForm = new Form(root);
console.log(createForm.sentMessege());
