var o = (function () {
  var obj = {
    a: 1,
    b: 2,
  };
  return {
    get(key) {
      if (obj.hasOwnProperty(key)) {
        return obj[key];
      }
    },
  };
})();
console.log(o.get("valueOf"));

Object.defineProperty(Object.prototype, "_this", {
  get() {
    return this;
  },
});
