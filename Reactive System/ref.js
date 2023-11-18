import { tracker, trigger } from "./effect.js";
import { TrackTypeMap, TriggerTypeMap } from "./operation.js";
import { reactive } from "./reactive.js";
import { hasChange, isObject } from "./utils.js";

export function ref(value) {
  return {
    get value() {
      tracker(this, TrackTypeMap.GET, "value"); // 依赖收集
      // 如果是对象则用reactive包裹
      if (isObject(value)) {
        return reactive(value);
      }
      return value;
    },
    set value(newValue) {
      if (!hasChange(value, newValue)) return;
      trigger(this, TriggerTypeMap.SET, "value"); // 派发更新
      value = isObject(newValue) ? reactive(newValue) : newValue;
    },
  };
}
