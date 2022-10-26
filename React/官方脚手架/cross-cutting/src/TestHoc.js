import React, { Component } from "react";
import withMouseListener from "./HOC/withMouseListener";

function MouseTracker(props) {
    return <p>鼠标相对容器的位置是 ({props.x}, {props.y})</p>
}

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
function MovableDiv(props) {
    const { divX, divY } = getDivPosition(props)
    return <div style={{
        width: "100px",
        height: "100px",
        background: "red",
        position: "absolute",
        left: divX,
        top: divY,
    }}></div>
}

const MouseTrackerWithMouseListener = withMouseListener(MouseTracker)
const MovableDivWithMouseListener = withMouseListener(MovableDiv)

export default class TestHoc extends Component {
    render() {
      return (
        <>
          <MouseTrackerWithMouseListener />
          <MovableDivWithMouseListener />
        </>
      );
    }
  }

