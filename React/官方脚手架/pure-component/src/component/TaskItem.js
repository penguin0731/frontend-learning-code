// TaskItem.js
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./TaskItem.css";
// import { ObjectEqual } from "../utils";

export default class TaskItem extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isFinish: PropTypes.bool.isRequired,
  };

//   shouldComponentUpdate(nextProps, nextState) {
//     var isPropsSame = ObjectEqual(this.props, nextProps);
//     var isStateSame = ObjectEqual(this.state, nextState);
//     if (isPropsSame && isStateSame) {
//       return false;
//     }
//     return true;
//   }

  render() {
    console.log("TaskItem render");
    return (
      <li className={this.props.isFinish ? "finish" : ""}>{this.props.name}</li>
    );
  }
}
