import React from 'react'

export default class MyComp extends React.Component {

    // constructor (props) {
    //     super(props);
    //     this.handleClick = this.handleClick.bind(this)
    // }
    // handleClick() {
    //     console.log(this)
    // }

    handleClick = () => {
        console.log(this)
    }


    
    render () {
        return <h1 onClick={this.handleClick}>测试</h1>
    }
}