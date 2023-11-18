import { effect } from "./effect.js";
import { reactive } from "./reactive.js";

// // let data = {
// //   a: 1,
// //   b: 2,
// // };
// // // hanlder.js:34
// // Object.defineProperty(data, "c", {
// //   get() {
// //     // 如果是proxy对象，那么就会收集到不必要的a和b依赖
// //     return this.a + this.b;
// //   },
// //   set() {},
// // });

// const obj = {};
// let data = [1, obj, 3];

// const state = reactive(data);
// window.state = state;

// function fn() {
//   // state.c;

//   // const i = state.indexOf(obj);
//   // console.log(i);

//   // state[5] = 2;
//   // state.length = 5;
//   // state.length = 2;
//   state.push(4)
// }

// fn();
// console.log(state);

let data = {
  a: 1,
  b: 2,
};
const state = reactive(data);

function fn2() {
  console.log("fn");
  // effect(() => {
  //   console.log("inner");
  //   state.a;
  // });
  // state.b;
  state.a ++;
}

effect(fn2);
// state.a = 2;
// state.b = 3;
