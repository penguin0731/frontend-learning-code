import React, { Component } from "react";
import MouseListener from "./RenderProps/MouseListener";

const MouseTracker = (mouse) => (
  <p>
    鼠标相对容器的位置是 ({mouse.x}, {mouse.y})
  </p>
);

const getDivPosition = (mouse) => {
  let divX = mouse.x - 50;
  let divY = mouse.y - 50;
  if (divX < 0) {
    divX = 0;
  } else if (divX > 300) {
    divX = 300;
  }
  if (divY < 0) {
    divY = 0;
  } else if (divY > 400) {
    divY = 400;
  }
  return { divX, divY };
};
const MovableDiv = (mouse) => {
  const { divX, divY } = getDivPosition(mouse);
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        background: "red",
        position: "absolute",
        left: divX,
        top: divY,
      }}
    ></div>
  );
};

export default class TestRenderProps extends Component {
  render() {
    return (
      <>
        <MouseListener render={MouseTracker} />
        <MouseListener render={MovableDiv} />
      </>
    );
  }
}
