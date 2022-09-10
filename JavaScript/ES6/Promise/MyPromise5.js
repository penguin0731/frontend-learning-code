const MyPromise = (() => {
  const PENDING = "pending",
    RESOLVED = "resolved",
    REJECTED = "rejected",
    PromiseStatus = Symbol("PromiseStatus"),
    PromiseValue = Symbol("PromiseValue"),
    thenables = Symbol("thenables"),
    catchables = Symbol("catchables"),
    changeStatus = Symbol("changeStatus"),
    linkPromise = Symbol("linkPromise"),
    settleHandle = Symbol("settleHandle");

  return class MyPromise {
    constructor(executor) {
      this[PromiseStatus] = PENDING;
      this[PromiseValue] = void 0;
      this[thenables] = [];
      this[catchables] = [];

      const resolve = (data) => {
        this[changeStatus](RESOLVED, data, this[thenables]);
      };
      const reject = (err) => {
        this[changeStatus](REJECTED, err, this[catchables]);
      };

      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }

    [changeStatus](status, value, queue) {
      if (this[PromiseStatus] !== PENDING) return;
      this[PromiseStatus] = status;
      this[PromiseValue] = value;
      queue.forEach((handler) => {
        handler(this[PromiseValue]);
      });
    }

    [linkPromise](thenable, catchable) {
      const exec = (handler, value, resolve, reject) => {
        try {
          const result = handler(value);
          if (result instanceof MyPromise) {
            result
              .then((res) => {
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      };
      thenable = typeof thenable === "function" ? thenable : (val) => val;
      catchable =
        typeof catchable === "function"
          ? catchable
          : (err) => {
              throw err;
            };
      return new MyPromise((resolve, reject) => {
        this[settleHandle](
          (data) => {
            exec(thenable, data, resolve, reject);
          },
          RESOLVED,
          this[thenable]
        );
        this[settleHandle](
          (err) => {
            exec(catchable, err, resolve, reject);
          },
          RESOLVED,
          this[catchable]
        );
      });
    }

    [settleHandle](handler, status, queue) {
      if (typeof handler !== "function") return;
      if (this[PromiseStatus] === status) {
        setTimeout(() => {
          handler(value);
        });
      } else {
        queue.push(handler);
      }
    }

    then(thenable, catchable) {
      return this[linkPromise](thenable, catchable);
    }

    catch(catchable) {
      return this[linkPromise](null, catchable);
    }

    static resolve(data) {
      return data instanceof MyPromise
        ? data
        : new MyPromise((resolve) => {
            resolve(data);
          });
    }

    static reject(err) {
      return new MyPromise((resolve, reject) => {
        reject(err);
      });
    }

    static all(promiseArr) {
      return new MyPromise((resolve, reject) => {
        const results = promiseArr.map((promise) => {
          const o = {
            isResolved: false,
            result: void 0,
          };
          promise
            .then((res) => {
              o.result = res;
              o.isResolved = true;
              const unResolvedArr = results.filter((r) => !r.isResolved);
              if (unResolvedArr.length === 0) {
                resolve(result.map((r) => r.result));
              }
            })
            .catch((err) => {
              reject(err);
            });
          return o;
        });
      });
    }

    static race(promiseArr) {
      return new MyPromise((resolve, reject) => {
        promiseArr.forEach((promise) => {
          promise
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    }
  };
})();
