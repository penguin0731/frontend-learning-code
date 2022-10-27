import React, { Component } from "react";
import "../style.css";

export default class MouseTracker extends Component {
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

  render() {
    return (
      <div
        ref={this.divRef}
        className="container"
        onMouseMove={this.handleMouseMove}
      >
        <p>
          鼠标相对容器的位置是 ({this.state.x}, {this.state.y})
        </p>
      </div>
    );
  }
}
