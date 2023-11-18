export function isObject(target) {
  return typeof target === "object" && target !== null;
}

export function hasChange(value1, value2) {
  return !Object.is(value1, value2);
}
