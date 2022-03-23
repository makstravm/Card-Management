import Input from "./Input";
import Button from "./Button";
import Element from "./Element";
import Checkbox from "./Checkbox";
import Post from "./Post";
import ApiService from "./APIservice";

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

  onSubmit = async () => {
    if (this.input.value) {
      const result = await ApiService.post("posts", {
        id: `post-${new Date().getTime()}`,
        text: this.input.value,
        status: this.checkbox.status,
      });
      if (result) {
        const post = new Post({
          parentId: this.postBox.id,
          value: result.text,
          flag: result.status,
          elementId: result.id,
        });
        post.render();
      }
      this.input.value = "";
    }
  };

  initForm() {
    this.parentId.appendChild(this.element);
    this.parentId.appendChild(this.postBox);
  }

  async renderPostInit() {
    const postsList = await ApiService.get("posts");
    postsList?.forEach((postMessege) => {
      const post = new Post({
        parentId: this.postBox.id,
        value: postMessege.text,
        flag: postMessege.status,
        elementId: postMessege.id,
      });
      post.render();
    });
  }

  render() {
    this.btn.render();
    this.btn.click(this.onSubmit);
    this.input.render();
    this.checkbox.render();
    this.renderPostInit();
  }
}
