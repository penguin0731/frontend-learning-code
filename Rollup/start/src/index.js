import { sum, sub } from "./utils";
// import dayjs from "dayjs/esm";
import dayjs from "dayjs";

let a = 1,
  b = 2;
const result = sum(a, b);
console.log(result);

const now = dayjs();
console.log(now.format());

const obj = {
  a: 1,
  foo() {
    const bar = () => {
      console.log(this.a);
    };
    bar();
  },
};
obj.foo();

Promise.resolve(100).then(res => {
  console.log(res);
})
