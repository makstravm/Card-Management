import Checkbox from "./Checkbox";
import Element from "./Element";
import ApiService from "./APIservice";

export default class Post extends Element {
  constructor(data) {
    super(data, "div");
    this.checkbox = new Checkbox({
      parentId: data.elementId,
      elementId: `checkbox-${new Date().getTime()}`,
      flag: data.flag,
    });
    this.element.innerHTML = `${data.value}`;
  }

  static async onClick(el) {
    await ApiService.put(`posts/${el.parentElement.id}`, {
      text: el.parentElement.innerText,
      status: el.checked,
    });
    const result = await ApiService.get(`posts/${el.parentElement.id}`);
    el.status = result.status;
  }

  render() {
    super.render();
    this.checkbox.render();
  }
}
