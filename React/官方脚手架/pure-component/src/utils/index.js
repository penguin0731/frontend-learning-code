export function ObjectEqual(obj1, obj2) {
  for (let prop in obj1) {
    if (!Object.is(obj1[prop], obj2[prop])) {
      return false;
    }
  }
  return true;
}
