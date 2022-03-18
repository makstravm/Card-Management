import _ from "lodash";
import "./style.css";
import Icon from "./images/img.png";
import printMe from "./print";
import HelloWorld from "./components/HelloWorld";
import "./components/Form";

function component() {
  const element = document.createElement("div");
  const div = document.createElement("div");
  const btn = document.createElement("button");
  const root = document.getElementById("roo");
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.classList.add("hello");

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = printMe;

  const myIcon = new Image();
  myIcon.src = Icon;

  root.innerHTML = HelloWorld();
  element.appendChild(myIcon);
  element.appendChild(btn);
  element.appendChild(div);
  return element;
}
component();
// document.body.appendChild(component());
