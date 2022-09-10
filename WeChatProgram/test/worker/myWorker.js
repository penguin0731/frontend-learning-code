/**
 * 在worker线程中，会自动创建一个worker对象，所以可以直接调用
 */
worker.onMessage(function (res) {
  console.log('worker线程的onMessage对象', res);
});

worker.postMessage({
  msg: 'xxx from worker'
})