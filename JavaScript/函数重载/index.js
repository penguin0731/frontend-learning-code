var searcher = {};

// 三个函数，都是实现查询功能，只因入参导致处理逻辑不同
// searcher.find = function() {
//     console.log('查询所有人');
// }

// searcher.findByName = function(name) {
//     console.log('按名字查询：' + name);
// }

// searcher.findByNameAndAge = function(name, age) {
//     console.log('按名字和年龄查询：' + name + ',' + age);
// }

// 为了避免使用时的心智负担，通过函数重载可以解决这个问题，开发者只需要调一个方法
// 通过传入不同的参数实现对应的逻辑处理

function addMethod(obj, name, handler) {
  const oldHandler = obj[name];
  obj[name] = function (...args) {
    if (args.length === handler.length) {
      handler.apply(this, args);
    } else if (typeof oldHandler === "function") {
      oldHandler.apply(this, args);
    }
  };
}

addMethod(searcher, "find", function () {
  console.log("查询所有人");
});
addMethod(searcher, "find", function (name) {
  console.log("按名字查询：" + name);
});
addMethod(searcher, "find", function (name, age) {
  console.log("按名字和年龄查询：" + name + "," + age);
});

searcher.find();
searcher.find("aaa");
searcher.find("qwe", 123);
