import React from 'react';
import ReactDOM from 'react-dom';

const url = 'https://tse1-mm.cn.bing.net/th?id=OIP.1e3YVW946dgy5uJH764JXwHaFj&w=154&h=110&c=8&rs=1&qlt=90&dpr=1.25&pid=3.1&rm=2'
const div = (
    <div>
        <img src={url} alt="" className='img' style={{
            border: '2px solid',
            marginLeft: '100px',
            width: '200px'
        }} />
    </div>
)
ReactDOM.render(div, document.getElementById('root'));