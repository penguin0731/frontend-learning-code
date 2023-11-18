// 关联数据和函数
import { TrackTypeMap, TriggerTypeMap } from "./operation.js";

const targetMap = new WeakMap();
const ITERATE_KEY = Symbol("iterate"); // 由于没有遍历这个操作类型没有属性名，因此新增一个遍历属性名
let shouldTrack = true; // 是否收集依赖
let activeEffect = null; // 当前的执行函数
const effectStack = []; // 执行函数的执行栈

// 暂停依赖收集
export function pauseTrack() {
  shouldTrack = false;
}

// 恢复依赖收集
export function resumeTrack() {
  shouldTrack = true;
}

export function effect(fn, options = {}) {
  const { lazy = false } = options;
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      effectStack.push(effectFn);
      cleanDeps(effectFn); // 每次执行前，将执行函数的依赖集合列表清空，避免存在多余的依赖被触发
      return fn();
    } finally {
      effectStack.pop(); // 执行完毕后，将执行函数推出执行栈
      activeEffect = effectStack[effectStack.length - 1]; // 将顶部的执行函数作为当前执行函数
    }
  };
  // 在执行函数上添加一个deps属性记录这个执行函数所在的依赖集合
  effectFn.deps = [];
  effectFn.options = options;
  // 延迟执行的话，只将执行函数返回，由开发者决定执行时机
  if (lazy) {
    return effectFn;
  }
  return effectFn();
}

// 将执行函数从相关的依赖集合中清除，并清空执行函数的依赖集合列表
function cleanDeps(effectFn) {
  effectFn.deps.forEach((dep) => {
    dep.delete(effectFn);
  });
  effectFn.deps = [];
}

// 依赖收集
// 收集的是，什么对象的什么属性，在哪个函数中进行了读取、遍历、是否存在三种操作
// 数据结构为：targetMap(记录对象) -> propMap(记录属性) -> opTypeMap(记录操作) -> depSet(记录函数)
export function tracker(target, opType, key) {
  if (!shouldTrack || !activeEffect) return;
  // 获取propMap
  let propMap = targetMap.get(target);
  if (!propMap) {
    propMap = new Map();
    targetMap.set(target, propMap);
  }
  // 获取opTypeMap
  if (opType === TrackTypeMap.ITERATE) {
    // 如果是遍历操作，则将属性名设置为遍历属性
    key = ITERATE_KEY;
  }
  let opTypeMap = propMap.get(key);
  if (!opTypeMap) {
    opTypeMap = new Map();
    propMap.set(key, opTypeMap);
  }
  // 获取depSet
  let depSet = opTypeMap.get(opType);
  if (!depSet) {
    depSet = new Set();
    opTypeMap.set(opType, depSet);
  }
  // 如果依赖集合中没有当前的执行函数，则将当前执行函数推入依赖集合，并将依赖集合推入执行函数的依赖集合列表中
  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect);
    activeEffect.deps.push(depSet);
  }
}

// 派发更新
// 更新的是，某个对象进行了属性赋值、新增属性、删除属性三种操作时
// 将这三种操作所影响的依赖收集的操作类型对应的函数重新执行一遍
export function trigger(target, opType, key) {
  const effectFns = getEffectFns(target, opType, key);
  if (!effectFns) return;
  effectFns.forEach((effectFn) => {
    // 如果派发更新的函数和依赖收集的函数是同一个（也就是读写都是在同一个函数中，如 a++），则跳过
    if (effectFn === activeEffect) return;
    // 多次触发派发更新时，由开发者决定是否继续派发更新
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      effectFn(); // 派发更新，重新执行执行函数，再次触发依赖收集，等待下次派发更新
    }
  });
}

// 获取执行函数列表
function getEffectFns(target, opType, key) {
  const propMap = targetMap.get(target);
  if (!propMap) return;
  const keys = [key]; // 属性名列表
  // 如果操作类型是新增或删除，那么会影响遍历结果，因此需要将遍历属性添加到属性名列表
  if (opType === TriggerTypeMap.ADD || opType === TriggerTypeMap.DELETE) {
    keys.push(ITERATE_KEY);
  }
  const effectFns = new Set();
  // 派发更新操作 映射 依赖收集操作
  const triggerTypeMap = {
    // 赋值类型应该派发读取类型收集的执行函数，即当我给属性赋值时，会影响到读取操作的代码
    [TriggerTypeMap.SET]: [TrackTypeMap.GET],
    // 新增类型应该派发读取、是否存在、遍历三种类型收集的执行函数，即当我新增属性时，会影响到读取、是否存在、遍历三种操作的代码
    [TriggerTypeMap.ADD]: [
      TrackTypeMap.GET,
      TrackTypeMap.HAS,
      TrackTypeMap.ITERATE,
    ],
    // 删除类型同新增类型
    [TriggerTypeMap.DELETE]: [
      TrackTypeMap.GET,
      TrackTypeMap.HAS,
      TrackTypeMap.ITERATE,
    ],
  };
  // 遍历属性名列表
  keys.forEach((key) => {
    // 获取派发更新的操作类型map
    const opTypeMap = propMap.get(key);
    if (!opTypeMap) return;
    // 获取派发更新的操作类型对应的依赖收集的操作类型
    const trackTypes = triggerTypeMap[opType];
    // 遍历依赖收集的操作类型列表
    trackTypes.forEach((trackType) => {
      // 获取对应的依赖集合
      const depSet = opTypeMap.get(trackType);
      if (!depSet) return;
      // 遍历依赖集合，取出执行函数放入到执行函数列表中
      depSet.forEach((dep) => {
        effectFns.add(dep);
      });
    });
  });
  return effectFns; // 返回执行函数列表
}
