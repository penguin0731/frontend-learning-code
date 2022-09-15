import React from 'react';

export default class MyComp extends React.Component {
  state = {
    foo: 0,
    bar: [6, 6, 6]
  }
  
  change = () => {
    this.setState({
      foo: this.state.foo + 1
    }, () => {
      console.log(this.state)
    });
    this.setState({
      foo: this.state.foo + 2
    }, () => {
      console.log(this.state)
    });
  }
  
	render () {
		console.log('render');
		return (
			<div>
				<button onClick={this.change}>change</button>
			</div>
		)
	}
}