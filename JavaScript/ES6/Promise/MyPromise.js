function MyPromise(executor) {
  const self = this;
  self.status = "pending";
  self.resolveValue = null;
  self.rejectReason = null;
  self.ResolveCallBackList = [];
  self.RejectCallBackList = [];
  function resolve(value) {
    if (self.status === "pending") {
      self.status = "Fulfilled";
      self.resolveValue = value;
      self.ResolveCallBackList.forEach(function (ele) {
        ele();
      });
    }
  }
  function reject(reason) {
    if (self.status === "pending") {
      self.status = "Rejected";
      self.rejectReason = reason;
      self.RejectCallBackList.forEach(function (ele) {
        ele();
      });
    }
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
    if (self.status === "Fulfilled") {
      setTimeout(function () {
        try {
          var nextResolveValue = onFulfilled(self.resolveValue);
          // res(nextResolveValue);
          ResolutionReturnPromise(nextPromise, nextResolveValue, res, rej);
        } catch (e) {
          rej(e);
        }
      });
    }
    if (self.status === "Rejected") {
      setTimeout(function () {
        try {
          var nextRejectValue = onRejected(self.rejectReason);
          // res(nextRejectValue);
          ResolutionReturnPromise(nextPromise, nextRejectValue, res, rej);
        } catch (e) {
          rej(e);
        }
      });
    }
    if (self.status === "pending") {
      self.ResolveCallBackList.push(function () {
        setTimeout(function () {
          try {
            var nextResolveValue = onFulfilled(self.resolveValue);
            // res(nextResolveValue);
            ResolutionReturnPromise(nextPromise, nextResolveValue, res, rej);
          } catch (e) {
            rej(e);
          }
        });
      });
      self.RejectCallBackList.push(function () {
        setTimeout(function () {
          try {
            var nextRejectValue = onRejected(self.rejectReason);
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
