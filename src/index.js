import "./style.css";
import Form from "./components/Form";

class App {
  constructor() {
    this.form = new Form();
  }

  render() {
    this.form.initForm();
    this.form.render();
  }
}

new App().render();
