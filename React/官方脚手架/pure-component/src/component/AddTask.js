import React, { PureComponent } from "react";
import PropTypes from 'prop-types';

export default class AddTask extends PureComponent {
  state = {
    value: "",
  };

  static propTypes = {
    addTask: PropTypes.func.isRequired
  }

  handleChangeValue = e => {
    this.setState({
        value: e.target.value
    })
  }

  handleAddTask = () => {
    this.props.addTask &&
      this.props.addTask({
        name: this.state.value,
        isFinish: false,
      });
    this.setState({
      value: "",
    });
  };

  render() {
    console.log('AddTask render')
    return (
      <div>
        <input value={this.state.value} onChange={this.handleChangeValue} />
        <button onClick={this.handleAddTask}>添加 Task</button>
      </div>
    );
  }
}
