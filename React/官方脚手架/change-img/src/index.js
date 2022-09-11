import React from "react";
import ReactDOM from "react-dom";
import src1 from "./assets/dog1.jpg";
import src2 from "./assets/dog2.jpg";
import src3 from "./assets/dog3.jpg";
import "./index.css";
import MyFunc from './MyFunc';
import MyClass from './MyClass';

let index = 0;
const srcs = [src1, src2, src3];
const container = document.getElementById("root");
let timer; // 计时器

/**
 * 根据index，显示某张图片
 */
function render() {
  ReactDOM.render(<div className="wrapper">
      <img src={srcs[index]} alt="" />
      <MyFunc />
      <MyClass />
    </div>, container);
}

/**
 * 启动计时器，每隔一段时间切换图片
 */
function start() {
  stop();
  timer = setInterval(() => {
    index = (index + 1) % 3; // 改变index
    render();
  }, 1000);
}

function stop() {
  clearInterval(timer);
}
render();
start();

container.onmouseenter = function() {
  stop();
};
container.onmouseleave = function() {
  start();
}
