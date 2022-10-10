import React from 'react';
import ReactDOM from 'react-dom';
import MyComp from './components/MyComp';
import MyComp2 from './components/MyComp2';
import MyComp3 from './components/MyComp3';
import MyComp4 from './components/MyComp4';

// const importAll = r => r.keys().map(r);
// // 生成 ./assets/imgs/ 下所有图片的路径数组，根据需要调整
// const preloadImgs = importAll(
//   require.context('./assets/', true, /\.(jpg|png|gif)$/)
// );
// console.log(preloadImgs)

// 当有数据发生改变时，需要重新渲染(虚拟DOM)
// 因为react元素本身是不能够被修改的，他可读不可写
// let num = 0;
// setInterval(() => {
//   num++;
//   const div = (
//     <div>
//       {num}
//     </div>
//   )
//   ReactDOM.render(div, document.getElementById('root'));
// }, 1000);

// ReactDOM.render(<MyComp number={10}/>, document.getElementById('root'))



// ReactDOM.render(<MyComp2/>, document.getElementById('root'))


// ReactDOM.render(<MyComp3/>, document.getElementById('root'))


ReactDOM.render(<MyComp4/>, document.getElementById('root'))
