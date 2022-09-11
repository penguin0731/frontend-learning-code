import React from 'react'
import './Pager.css';


/**
 * 分页组件
 * 属性：
 * 1. current 当前页码
 * 2. total 总数据量
 * 3. pageSize 页容量
 * 4. panelNumber 最多显示多少页码
 */
export default function Pager(props) {
    const pageNum = getPageNum(props);
    const min = getMinNum(props);
    const max = getMaxNum(min, pageNum, props);
    let numbers = [];
    for(let i = min; i <= max; i++) {
        numbers.push(<span key={i} onClick={() => {toPage(i, props)}} className={i === props.current ? 'item active' : 'item'}>{i}</span>);
    }
    return (
        <>
            <span 
                onClick={() => {toPage(1, props)}}
                className={props.current === 1 ? 'item disabled' : 'item'
            }>首页</span>
            <span 
                onClick={() => {toPage(props.current - 1 < 1 ? 1 : props.current - 1, props)}}
                className={props.current === 1 ? 'item disabled' : 'item'
            }>上一页</span>

            {/* 数字页码 */}
            {numbers}

            <span 
                onClick={() => {toPage(props.current + 1 > pageNum ? pageNum : props.current + 1, props)}}
                className={props.current === pageNum ? 'item disabled' : 'item'
            }>下一页</span>
            <span 
                onClick={() => {toPage(pageNum, props)}}
                className={props.current === pageNum ? 'item disabled' : 'item'
            }>尾页</span>
            <span>{props.current}</span>
            /
            <span>{pageNum}</span>
        </>
    )
}

/**
 * 获取总页数
 * @param {*} props 
 */
function getPageNum(props) {
    return Math.ceil(props.total / props.pageSize);
}

/**
 * 计算最小数字
 * @param {*} props 
 */
function getMinNum(props) {
    var min = props.current - Math.floor(props.panelNumber / 2);
    if(min < 1) {
        min = 1
    }
    return min;
}

/**
 * 计算最大数字
 * @param {*} min 
 * @param {*} pageNum 
 * @param {*} props 
 */
function getMaxNum(min, pageNum, props) {
    var max = min + props.panelNumber - 1;
    if(max > pageNum) {
        max = pageNum
    }
    return max;
}

/**
 * 跳转到某一页面
 * @param {*} target 
 * @param {*} props 
 */
function toPage(target, props) {
    if(target === props.current) return;
    props.onPageChange && props.onPageChange(target);
}
