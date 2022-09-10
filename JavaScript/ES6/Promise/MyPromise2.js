function MyPromise(executor) {
  const self = this;
  const PENDING = "pending";
  const RESOLVED = "resolved";
  const REJECTED = "rejected";
  self.promiseStatus = PENDING;
  self.promiseValue = null;
  self.FulfilledList = [];
  self.RejectedList = [];

  function changeStatus(status, value, queue) {
    if (self.promiseStatus !== PENDING) return;
    self.promiseStatus = status;
    self.promiseValue = value;
    queue.forEach((handler) => handler(value));
  }

  function resolve(value) {
    // if (self.promiseStatus === PENDING) {
    //   self.promiseStatus = RESOLVED;
    //   self.promiseValue = value;
    //   self.FulfilledList.forEach(function (ele) {
    //     ele();
    //   });
    // }
    changeStatus(RESOLVED, value, self.FulfilledList);
  }
  function reject(err) {
    // if (self.promiseStatus === PENDING) {
    //   self.promiseStatus = REJECTED;
    //   self.promiseValue = err;
    //   self.RejectedList.forEach(function (ele) {
    //     ele();
    //   });
    // }
    changeStatus(REJECTED, err, self.RejectedList);
  }

  //抛出错误时捕捉错误并执行错误函数
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function ResolutionReturnPromise(nextPromise, returnValue, res, rej) {
  if (returnValue instanceof MyPromise) {
    //Promise对象
    returnValue.then(
      function (val) {
        res(val);
      },
      function (reason) {
        rej(reason);
      }
    );
  } else {
    res(returnValue);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  //空then
  if (!onFulfilled) {
    onFulfilled = function (val) {
      return val;
    };
  }
  if (!onRejected) {
    onRejected = function (reason) {
      throw new Error(reason);
    };
  }
  var self = this;
  //链式调用时返回的是一个新的promise对象
  var nextPromise = new MyPromise(function (res, rej) {
    if (self.promiseStatus === RESOLVED) {
      setTimeout(function () {
        try {
          var nextResolveValue = onFulfilled(self.promiseValue);
          // res(nextResolveValue);
          ResolutionReturnPromise(nextPromise, nextResolveValue, res, rej);
        } catch (e) {
          rej(e);
        }
      });
    }
    if (self.promiseStatus === REJECTED) {
      setTimeout(function () {
        try {
          var nextRejectValue = onRejected(self.promiseValue);
          // res(nextRejectValue);
          ResolutionReturnPromise(nextPromise, nextRejectValue, res, rej);
        } catch (e) {
          rej(e);
        }
      });
    }
    if (self.promiseStatus === PENDING) {
      self.FulfilledList.push(function () {
        setTimeout(function () {
          try {
            var nextResolveValue = onFulfilled(self.promiseValue);
            // res(nextResolveValue);
            ResolutionReturnPromise(nextPromise, nextResolveValue, res, rej);
          } catch (e) {
            rej(e);
          }
        });
      });
      self.RejectedList.push(function () {
        setTimeout(function () {
          try {
            var nextRejectValue = onRejected(self.promiseValue);
            // res(nextRejectValue);
            ResolutionReturnPromise(nextPromise, nextRejectValue, res, rej);
          } catch (e) {
            rej(e);
          }
        });
      });
    }
  });
  return nextPromise;
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

MyPromise.race = function (promiseArr) {
  return new MyPromise(function (resolve, reject) {
    promiseArr.forEach(function (promise, index) {
      promise.then(
        function (res) {
          resolve(res);
        },
        function (err) {
          reject(err);
        }
      );
    });
  });
};

MyPromise.all = function (promiseArr) {
  let times = promiseArr.length;
  let newArr = [];
  return new MyPromise(function (resolve, reject) {
    promiseArr.forEach(function (promise) {
      promise.then(
        function (res) {
          newArr.push(res);
          --times;
          if (times == 0) {
            resolve(newArr);
          }
        },
        function (reason) {
          reject(reason);
        }
      );
    });
  });
};
