function getJson() {
  return fetch("https://jsonplaceholder.typicode.com/posts");
}

function pureFn1() {
  return getJson();
}

function pureFn2() {
  return pureFn1();
}

function pureFn3() {
  return pureFn2();
}

function main() {
  const result = pureFn3();
  console.log(result);
}

// 消除异步传染性
// 1. 在发送请求的时候，抛出错误
// 2. 此时请求已经发出，拿到结果后将其缓存
// 3. 当结果已经缓存好之后，重新发出请求，拿到缓存结果
// 要做到上述步骤，需要重写fetch
function run(fn) {
  let cache = []; // 将fn函数中的请求结果存起来
  let i = 0; // fn函数中的第i个请求
  let _originFetch = window.fetch; // 保存原始的fetch
  // 重写fetch
  window.fetch = (...args) => {
    // 命中缓存
    if (cache[i]) {
      if (cache[i].status === "fulfilled") {
        return cache[i].data;
      } else if (cache[i].status === "rejected") {
        throw cache[i].err;
      }
    }
    const result = {
      status: "pending",
      data: null,
      err: null,
    };
    // 把结果缓存
    cache[i++] = result;
    const thenabel = (res) => {
      // 更新结果
      result.status = "fulfilled";
      result.data = res;
    };
    const catchable = (err) => {
      // 更新结果
      result.status = "rejected";
      result.err = err;
    };
    // 调用原始请求
    const promise = _originFetch(...args)
      .then((res) => res.json())
      .then(thenabel, catchable);
    // 把原始请求的promise当作错误抛出
    throw promise;
  };

  // 执行目标函数
  try {
    // 当目标函数中的请求发出时，将会抛出错误
    fn();
  } catch (err) {
    // 当抛出的是promise时，才重新执行目标函数
    if (err instanceof Promise) {
      // 不管缓存结果是成功失败，直接重置i，并再次发出请求拿到缓存结果
      err.finally(() => {
        i = 0;
        fn();
      });
    }
  }
}

run(main);
