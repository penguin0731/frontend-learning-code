import React, { Component } from "react";
import MouseTracker from "./component/MouseTracker";
import MovableDiv from "./component/MovableDiv";

export default class Test extends Component {
  render() {
    return (
      <>
        <MouseTracker />
        <MovableDiv />
      </>
    );
  }
}
