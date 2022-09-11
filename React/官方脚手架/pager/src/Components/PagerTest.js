import React, { Component } from 'react'
import Pager from './Pager'

export default class PageTest extends Component {
    state = {
        current: 3,
        total: 100,
        pageSize: 10,
        panelNumber: 5
    }

    handlePageChange = (target) => {
        this.setState({
            current: target
        });
    }

    render() {
        return (
            <div>
                <Pager onPageChange={this.handlePageChange} {...this.state} />
            </div>
        )
    }
}


