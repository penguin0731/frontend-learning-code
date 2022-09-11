import React from 'react';
import ReactDOM from 'react-dom';

// 如果要解析字符串里的html代码
// 需要使用dangerouslySetInnerHTML，并传入一个对象，设置__html属性的值为该字符串
// 由于这个操作过于危险，因此react设置了重重障碍
const content = '<div>qwewqeqw</div><p>asdasdasd</p>'
const div = (
    <div dangerouslySetInnerHTML={{
        __html: content
    }}>
        
    </div>
)

ReactDOM.render(div, document.getElementById('root'));