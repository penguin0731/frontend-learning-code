const MyPromise = (() => {
  const PENDING = "pending",
    RESOLVED = "resolved",
    REJECTED = "rejected",
    PromiseStatus = Symbol("PromiseStatus"), // 状态
    PromiseValue = Symbol("PromiseValue"), // 状态数据
    FulfilledList = Symbol("FulfilledList"), // 成功的作业队列
    RejectedList = Symbol("RejectedList"), // 失败的作业队列
    changeStatus = Symbol("changeStatus"); // 修改状态的函数
  return class MyPromise {
    constructor(executor) {
      this[PromiseStatus] = PENDING; // 初始化状态为pending
      this[PromiseValue] = undefined; // 初始化状态数据为undefined
      this[FulfilledList] = [];
      this[RejectedList] = [];

      const resolve = (res) => {
        // 将状态推向成功的函数
        this[changeStatus](RESOLVED, res, this[FulfilledList]);
      };
      const reject = (reason) => {
        // 将状态推向失败的函数
        this[changeStatus](REJECTED, reason, this[RejectedList]);
      };

      try {
        executor(resolve, reject);
      } catch (error) {
        // 若Promise函数不能正常运行，则捕获错误，将状态推向失败
        reject(error);
      }
    }

    /**
     * 修改状态的函数
     * @param {*} newStatus 新的状态(resolved/rejected)
     * @param {*} newValue 用户传递的状态数据
     * @param {*} queue 作业队列(FulfilledList/RejectedList)
     */
    [changeStatus](newStatus, newValue, queue) {
      if (this[PromiseStatus] !== PENDING) return; // 若状态不为pending，则无法改变状态
      this[PromiseStatus] = newStatus;
      this[PromiseValue] = newValue;
      queue.forEach((handler) => {
        // 改变状态后执行作业队列里的函数
        handler(this[PromiseValue]);
      });
    }

    /**
     * 执行成功或失败的回调函数
     * @param {*} thenable 成功的回调函数
     * @param {*} catchable 失败的回调函数
     */
    then(thenable, catchable) {
      // 为了能让promise链式调用，调用then方法的时候需要返回一个全新的promise对象
      // 而成功或失败的函数需要在这个全新的promise对象里执行
      // 才能让全新的promise对象的状态推向成功或失败
      return new MyPromise((resolve, reject) => {
        // 空then
        thenable = typeof thenable === "function" ? thenable : (val) => val;
        // 空catch
        catchable =
          typeof catchable === "function"
            ? catchable
            : (err) => {
                throw err;
              };
        if (this[PromiseStatus] === RESOLVED) {
          // 若当前状态为成功
          setTimeout(() => {
            // 通过setTimeout来模拟异步
            // 注意：回调函数是微任务,setTimeout是宏任务
            try {
              const result = thenable(this[PromiseValue]); // 得到成功的回调函数的结果
              if (result instanceof MyPromise) {
                // 若结果返回的是一个新的promise对象
                // 若结果的状态是成功，则把全新的promise对象的状态推向成功
                // 若是失败，则把全新的promsie对象的状态推向失败
                result.then(
                  (res) => resolve(res),
                  (err) => reject(err)
                );
              } else {
                // 否则将全新的promise对象的状态推向成功
                resolve(result);
              }
            } catch (error) {
              // 若捕获到成功回调的错误，则将全新的promise对象的状态推向失败
              reject(error);
            }
          });
        } else {
          // 当前状态为pending，将上述操作打包成一个函数，push到成功的作业队列里
          this[FulfilledList].push((data) => {
            setTimeout(() => {
              // 通过setTimeout来模拟异步
              // 注意：回调函数是微任务,setTimeout是宏任务
              try {
                const result = thenable(data); // 得到成功的回调函数的结果
                if (result instanceof MyPromise) {
                  // 若结果返回的是一个新的promise对象
                  // 若结果的状态是成功，则把全新的promise对象的状态推向成功
                  // 若是失败，则把全新的promsie对象的状态推向失败
                  result.then(
                    (res) => resolve(res),
                    (err) => reject(err)
                  );
                } else {
                  // 否则将全新的promise对象的状态推向成功
                  resolve(result);
                }
              } catch (error) {
                // 若捕获到成功回调的错误，则将全新的promise对象的状态推向失败
                reject(error);
              }
            });
          });
        }

        if (this[PromiseStatus] === REJECTED) {
          setTimeout(() => {
            try {
              const result = catchable(this[PromiseValue]);
              if (result instanceof MyPromise) {
                result.then(
                  (res) => resolve(res),
                  (err) => reject(err)
                );
              } else {
                resolve(result);
              }
            } catch (error) {
              reject(error);
            }
          });
        } else {
          this[RejectedList].push((reason) => {
            setTimeout(() => {
              try {
                const result = catchable(reason);
                if (result instanceof MyPromise) {
                  result.then(
                    (res) => resolve(res),
                    (err) => reject(err)
                  );
                } else {
                  resolve(result);
                }
              } catch (error) {
                reject(error);
              }
            });
          });
        }
      });
    }

    catch(catchable) {
      this.then(null, catchable);
    }
  };
})();
