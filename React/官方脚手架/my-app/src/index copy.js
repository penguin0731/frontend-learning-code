import React from 'react';
import ReactDOM from 'react-dom';

/** <React.Fragment></React.Fragment> 简写为<></> */
// const h1 = (
//     <React.Fragment>
//         <h1>Hello World</h1>
//         <h2>get out</h2>
//     </React.Fragment>
// )
// ReactDOM.render(h1, document.getElementById('root'));

const a = 1234, b = 4321;
const div = (
    <div>
        {a}*{b}={a*b}
    </div>
)
ReactDOM.render(div, document.getElementById('root'));