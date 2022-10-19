// TaskContainer.js
import React, { Component } from "react";
import TaskList from "./TaskList.js";
import AddTask from "./AddTask.js";

export default class TaskContainer extends Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    let tasks = [];
    for (let i = 0; i < 10; i++) {
      tasks.push({
        name: `任务${i + 1}`,
        isFinish: Math.random() > 0.5,
      });
    }
    this.setState({ tasks });
  }

  handleAddTask = (newTask) => {
    this.setState({
        tasks: [...this.state.tasks, newTask]
    })
  };

  render() {
    console.log("TaskContainer render");
    return (
      <>
        <AddTask addTask={this.handleAddTask} />
        <TaskList tasks={this.state.tasks} />
      </>
    );
  }
}
