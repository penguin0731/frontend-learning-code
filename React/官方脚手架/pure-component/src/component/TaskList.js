// TaskList.js
import React, { Component } from 'react';
import TaskItem from './TaskItem.js';
import PropTypes from 'prop-types';

export default class TaskList extends Component {
  
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      isFinish: PropTypes.bool.isRequired
    })).isRequired
  }
  
  render() {
    console.log('TaskList render')
    const ts = this.props.tasks.map((item, index) => (<TaskItem {...item} key={index} />))
    return (
      <ul>
      	{ts}
      </ul>
    )
  }
}