import _ from "lodash";
import "./style.css";
import Icon from "./images/img.png";
import printMe from "./print";

function component() {
  const element = document.createElement("div");
  const btn = document.createElement("button");
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;

  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);
  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());
