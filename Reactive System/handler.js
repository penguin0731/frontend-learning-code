// 监听读写
import { pauseTrack, resumeTrack, tracker, trigger } from "./effect.js";
import { TrackTypeMap, TriggerTypeMap } from "./operation.js";
import { reactive } from "./reactive.js";
import { hasChange, isObject } from "./utils.js";

const arrayInstrumentation = {};
// 重写数组方法
["includes", "indexOf", "lastIndexOf"].forEach((key) => {
  arrayInstrumentation[key] = function (...args) {
    // 这几个数组方法，如果遇到目标是对象，那么即使数组存在这个对象也找不到，因为此时的调用数组的是代理对象
    // 而代理对象是深度代理的，也就是拿原始对象去跟代理对象比较当然找不到
    // 为了解决这种情况，有两种方案：
    // 1. 将传入的目标对象转化为代理对象
    // 2. 当在代理对象中无法找到目标时，去原始对象重新找一遍
    // 第二种方法效率较低，因为可能要遍历两次，并且会收集过多依赖
    // 下面是采用第一种方法
    const origin = args[0];
    args[0] = reactive(origin);
    return Array.prototype[key].apply(this, args);
  };
});

// 重写数组方法
["push", "pop", "shift", "unshift", "slice"].forEach((key) => {
  arrayInstrumentation[key] = function (...args) {
    // 这几个数组方法都会对数组长度发生改变，并且触发length的依赖收集
    // 但对于开发者而言，使用这几个方法并不是为了使用数组长度，因此没必要进行length的依赖收集
    // 为了解决这种情况，有两种方案：
    // 1. 重写数组方法
    // 2. 在方法执行前暂停依赖收集
    pauseTrack();
    const result = Array.prototype[key].apply(this, args);
    resumeTrack();
    return result;
  };
});

function get(target, key, receiver) {
  tracker(target, TrackTypeMap.GET, key);
  // 如果调用的是数组的某个方法，则返回重写的方法
  if (arrayInstrumentation.hasOwnProperty(key)) {
    return arrayInstrumentation[key];
  }
  const result = Reflect.get(target, key, receiver);
  // 如果读取的属性是一个对象，则再次进行代理
  if (isObject(target[key])) {
    return reactive(target[key]);
  }
  return result;
}

// setter应当返回一个boolean值表示属性设置是否成功
function set(target, key, newValue, receiver) {
  // 判断设置属性的操作类型
  // 此处不能使用 in 关键字判断，因为 in 关键字会判断对象原型链上的属性，因此会影响对set和add操作的判断
  const type = target.hasOwnProperty(key)
    ? TriggerTypeMap.SET
    : TriggerTypeMap.ADD;

  // good
  const oldValue = target[key];
  // good 不传recevier的话，效果和target[key]一样，访问的是原始对象
  // const oldValue = Reflect.get(target, key);
  // bad 因为receiver表示调用者，它可以让this指向调用者，访问的是proxy对象，所以会收集到不必要的依赖
  // const oldValue = Reflect.get(target, key, receiver);

  const oldLength = Array.isArray(target) ? target.length : void 0;

  // 赋值操作可能失败，如：冻结对象、只有getter的目标属性等
  const result = Reflect.set(target, key, newValue, receiver);
  if (!result) {
    return result;
  }

  const newLength = Array.isArray(target) ? target.length : void 0;

  if (hasChange(oldValue, newValue) || type === TrackTypeMap.ADD) {
    trigger(target, type, key);

    // 通过索引改变数组长度时，不会触发length属性的setter
    // 这是因为这种修改方式是隐式修改，即通过Object.defineProperty修改
    // 因此我们需要手动触发length属性的setter，触发条件如下：
    // 1. 目标对象是数组
    // 2. 修改前后数组长度发生变化
    // 3. 修改的不是length属性
    // ==============================================
    // 通过修改length属性来减小数组长度，虽然
    // 原理同上
    // 触发条件同上两点
    // 3. 修改的是length属性
    if (Array.isArray(target) && oldLength !== newLength) {
      if (key !== "length") {
        trigger(target, TriggerTypeMap.SET, "length");
      } else {
        for (let i = newLength; i < oldLength; i++) {
          trigger(target, TriggerTypeMap.DELETE, i);
        }
      }
    }
  }
  return result;
}

function deleteProperty(target, key) {
  const hadKey = target.hasOwnProperty(key);
  const result = Reflect.deleteProperty(target, key);
  // 原来有的属性并且删除成功才触发派发更新
  if (hadKey && result) {
    trigger(target, TriggerTypeMap.DELETE, key);
  }
  return result;
}

function has(target, key) {
  tracker(target, TrackTypeMap.HAS, key);
  return Reflect.has(target, key);
}

function ownKeys(target) {
  tracker(target, TrackTypeMap.ITERATE);
  return Reflect.ownKeys(target);
}

export const handler = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys,
};
