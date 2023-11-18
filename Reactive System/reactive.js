import { handler } from "./handler.js";
import { isObject } from "./utils.js";

// 存储原始数据的代理，weakmap是弱引用，当数据没有使用时会自动垃圾回收
const targetMap = new WeakMap();

export function reactive(target) {
  if (!isObject(target)) {
    console.warn(`value cannot be made reactive: ${String(target)}`);
    return target;
  }
  if (targetMap.has(target)) {
    return targetMap.get(target);
  }
  const proxy = new Proxy(target, handler);
  targetMap.set(target, proxy);
  return proxy;
}
