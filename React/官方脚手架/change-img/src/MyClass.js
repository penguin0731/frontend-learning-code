import React, { Component } from 'react'

// 类组件必须继承React.Cpomponent
export default class MyClass extends React.Component{
    // 该方法必须返回一个react元素
    render() {
        return <h1>我是类组件</h1>
    }
}