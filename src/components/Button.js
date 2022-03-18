export default class Button {
  constructor(el) {
    const btn = document.createElement("button");
    btn.innerText = "Button";
    el.appendChild(btn);
  }

  click(data) {
    this.onclick = () => console.log(`Sent messege ${data}`);
  }

  // render() {s}
}
