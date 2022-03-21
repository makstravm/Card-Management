import Form from "./components/Form";
import "./style.css";

const root = document.getElementById("root");

class App {
  constructor(formId, parrentId) {
    this.form = new Form(formId, parrentId);
  }

  render() {
    this.form.initForm();
    this.form.render();
  }
}

new App("formId", root).render();
