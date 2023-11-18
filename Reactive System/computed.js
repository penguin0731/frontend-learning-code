import { effect, tracker, trigger } from "./effect.js";
import { TrackTypeMap, TriggerTypeMap } from "./operation.js";

export function computed(getterOrOptions) {
  const { getter, setter } = normalizeParams(getterOrOptions);
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true;
      trigger(obj, TriggerTypeMap.SET, "value"); // 派发更新
    },
  });

  let value, // 将计算属性的值缓存
    dirty = true; // 判断计算属性的值是否为脏值（即依赖发生变化）

  const obj = {
    get value() {
      if (dirty) {
        tracker(this, TrackTypeMap.GET, "value"); // 依赖收集
        value = effectFn();
        dirty = false;
      }
      return value;
    },
    set value(newValue) {
      setter(newValue);
    },
  };
  return obj;
}

function normalizeParams(getterOrOptions) {
  let getter, setter;
  if (typeof getterOrOptions === "function") {
    getter = getterOrOptions;
    setter = () => {
      console.warn("computed property was assigned to but it has no setter");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return { getter, setter };
}
