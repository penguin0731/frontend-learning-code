import React from 'react';

export default class MyComp extends React.Component {
  state = {
    x: 0,
    y: 0
  }
  
  handleClick = () => {
    // this.setState({
    //     x: this.state.x + 1
    // }, () => {
    //     this.setState({
    //         y: this.state.x * 2
    //     })
    // })
    this.setState(state => ({
        x: state.x + 1
      }));
      this.setState(state => {
        console.log(state.x);
        return {
          y: state.x * 2
        }
      }, () => {
        console.log(this.state.y)
      });
  }
  
	render () {
        console.log('render');
		return (
			<div>
				<h1>{this.state.x}</h1>
                <h1>{this.state.y}</h1>
				<button onClick={this.handleClick}>+</button>
			</div>
		)
	}
}

