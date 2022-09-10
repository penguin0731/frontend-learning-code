// 本文采用ES6的类(class)进行promise源码复刻

const MyPromise = (() => {
  const PENDING = "pending",
    RESOLVED = "resolved",
    REJECTED = "rejected",
    PromiseValue = Symbol("PromiseValue"), // 状态数据(不希望用户能够访问到,所以使用符号)
    PromiseStatus = Symbol("PromiseStatus"), // 当前状态
    changeStatus = Symbol("changeStatus"), // 改变当前状态
    thenables = Symbol("thenables"), // then函数
    catchables = Symbol("catchables"), // catch函数
    settleHandle = Symbol("settleHandle"), // 处理 后续执行函数(then、cathc)
    linkPromise = Symbol("linkPromise"); // 创建串联的promise

  return class MyPromise {
    /**
     *
     * @param {*} executor 未决阶段(pending状态)下的执行函数
     */
    constructor(executor) {
      // 初始状态
      this[PromiseStatus] = PENDING;
      this[PromiseValue] = undefined;
      this[thenables] = []; // 后续处理函数的数组(针对resolve状态)
      this[catchables] = []; // 后续处理函数的数组(针对reject状态)

      const resolve = (data) => {
        this[changeStatus](RESOLVED, data, this[thenables]);
      };
      const reject = (reason) => {
        this[changeStatus](REJECTED, reason, this[catchables]);
      };

      // 如果在执行函数里抛出错误,需要进行捕获
      try {
        executor(resolve, reject);
      } catch (err) {
        reject(err);
      }
    }

    /**
     * 改变当前状态
     * @param {*} newStatus
     * @param {*} newValue
     * @param {*} queue 执行的作业队列
     */
    [changeStatus](newStatus, newValue, queue) {
      if (this[PromiseStatus] !== PENDING) return; // 若状态不是pending,则无法变更状态
      this[PromiseStatus] = newStatus;
      this[PromiseValue] = newValue;
      // 执行相应队列的函数
      queue.forEach((handler) => {
        handler(this[PromiseValue]);
      });
    }

    then(thenable, catchable) {
      return this[linkPromise](thenable, catchable);
    }

    catch(catchable) {
      return this[linkPromise](null, catchable);
    }

    // 实现链式调用promsie
    [linkPromise](thenable, catchable) {
      function exec(data, handler, resolve, reject) {
        try {
          const result = handler(data); // 得到当前Promise的处理结果
          if (result instanceof MyPromise) {
            // 如果返回结果是Promise对象
            result.then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            ); //则传递数据而不是Promise对象
          } else {
            resolve(result);
          }
        } catch (error) {
          //执行过程出错,将状态推向reject
          reject(error);
        }
      }

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
        this[settleHandle](
          (data) => {
            exec(data, thenable, resolve, reject);
          },
          RESOLVED,
          this[thenables]
        );

        this[settleHandle](
          (reason) => {
            exec(reason, catchable, resolve, reject);
          },
          REJECTED,
          this[catchables]
        );
      });
    }

    /**
     * 处理 后续执行函数
     * @param {*} handler 后续的执行函数
     * @param {*} status 状态
     * @param {*} queue 作业队列
     */
    [settleHandle](handler, status, queue) {
      if (typeof handler !== "function") return;
      if (this[PromiseStatus] === status) {
        setTimeout(() => handler(this[PromiseValue]));
      } else {
        queue.push(handler);
      }
    }

    static resolve(data) {
      return data instanceof MyPromise
        ? data
        : new MyPromise((resolve) => {
            resolve(data);
          });
    }

    static reject(reason) {
      return new MyPromise((resolve, reject) => {
        reject(reason);
      });
    }

    static all(promiseArr) {
      return new MyPromise((resolve, reject) => {
        const results = promiseArr.map((p) => {
          const obj = {
            result: undefined,
            isResolved: false,
          };
          p.then(
            (res) => {
              obj.result = res;
              obj.isResolved = true;
              // 判断是否全部完成
              const unResolved = results.filter((r) => !r.isResolved);
              if (unResolved.length === 0) {
                // 全部完成
                resolve(results.map((r) => r.result));
              }
            },
            (err) => {
              reject(err);
            }
          );
          return obj;
        });
      });
    }

    static race(promiseArr) {
      return new MyPromise((resolve, reject) => {
        promiseArr.forEach((p) => {
          p.then(
            (res) => resolve(res),
            (err) => reject(err)
          );
        });
      });
    }
  };
})();
