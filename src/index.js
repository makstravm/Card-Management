import Form from "./components/Form";

const root = document.getElementById("root");

class App {
  constructor() {
    this.form = new Form("formId", root);
  }

  render() {
    this.form.initForm();
    this.form.render();
  }
}

new App().render();
