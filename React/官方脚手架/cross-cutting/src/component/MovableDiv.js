import React, { Component } from "react";
import "../style.css";

export default class MovableDiv extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  divRef = React.createRef();

  handleMouseMove = (event) => {
    const { left, top } = this.divRef.current.getBoundingClientRect();
    this.setState({
      x: event.clientX - left,
      y: event.clientY - top,
    });
  };

  getDivPosition = () => {
    let divX = this.state.x - 50;
    let divY = this.state.y - 50;
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

  render() {
    const { divX, divY } = this.getDivPosition();
    return (
      <div
        ref={this.divRef}
        className="container"
        onMouseMove={this.handleMouseMove}
      >
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
      </div>
    );
  }
}
