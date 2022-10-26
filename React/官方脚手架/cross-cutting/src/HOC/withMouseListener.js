import React, { PureComponent } from "react";
import '../style.css'

export default function withMouseListener(Comp) {
  return class MouseListener extends PureComponent {
    state = {
      x: 0,
      y: 0,
    };

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
          <Comp {...this.props} x={this.state.x} y={this.state.y} />
        </div>
      );
    }
  };
}
