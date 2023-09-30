/**
 * 并发请求
 * @param {Promise} requestList 请求列表
 * @param {Number} maxNum 最大并发数
 */
function concurRequest(requestList, maxNum = 5) {
  return new Promise((resolve) => {
    let results = [];
    if (requestList.length === 0) {
      resolve([]);
      console.log(11);
    }
    let index = 0; // 当前索引下标
    let count = 0; // 已完成的请求数量
    function _run() {
      if (index === requestList.length) {
        return;
      }
      const i = index;
      const request = requestList[i];
      index++;
      if (!(request instanceof Promise)) {
        throw TypeError(`requestList[${i}] is not a promise`);
      }
      request
        .then((res) => {
          console.log(res.url);
          results[i] = res;
        })
        .catch((err) => {
          results[i] = err;
        })
        .finally(() => {
          count++;
          if (count === requestList.length) {
            resolve(results);
            return;
          }
          _run();
        });
    }
    // 最大并发数有可能大于请求数组的长度，为了避免请求数组长度不足
    // 在最大并发数和请求数组的长度中取最小值作为并发数
    const times = Math.min(maxNum, requestList.length);
    for (let i = 0; i < times; i++) {
      _run();
    }
  });
}

let map = new Array(20)
  .fill(0)
  .map((item, index) =>
    fetch(`https://jsonplaceholder.typicode.com/todos/${index + 1}`)
  );

// map = [1, ...map];

concurRequest(map, 5).then((results) => {
  console.log(results);
});
