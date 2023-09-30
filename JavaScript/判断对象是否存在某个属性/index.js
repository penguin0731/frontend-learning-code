var obj = {
    a: 1
}
Object.defineProperty(obj, 'b', {
    enumerable: false,
    value: 2
})
// 1.
// console.log('b' in obj);
// console.log('toString' in obj);
// // 2.
console.log(Reflect.has(obj, 'b'));
console.log(Reflect.has(obj, 'toString'));
// // 3.
// console.log(obj.hasOwnProperty('b'));
// console.log(obj.hasOwnProperty('toString'));
// console.log(obj.toString);
// // 4.
// function hasProperty(obj, key) {
//     return Object.keys(obj).includes(key);
// }
// console.log(hasProperty(obj, 'b'));