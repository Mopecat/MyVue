// 监听器：作用是监听数据的每一个属性，监听到属性发生变化后通知watcher订阅者执行更新函数去更新视图，在这个过程中可能会有很多个watcher所以我们需要创建一个dep容器统一管理

function defineReactive(data, key, value) {
  // 递归调用 重写data中的所有属性
  observer(value);
  var dep = new Dep();
  // 数据劫持
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return value;
    },
    set(newVal) {
      if (value !== newVal) {
        value = newVal;
        // 通知函数
        dep.notify();
      }
    }
  });
}

function observer(data) {
  if (!data || typeof data !== "object") {
    return;
  }
  // 重写对象的每一个属性
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

// 用于管理watcher的容器 应用发布订阅设计模式
function Dep() {
  this.subs = [];
}

Dep.prototype.addSub = function(sub) {
  this.subs.push(sub);
};

Dep.prototype.notify = function() {
  console.log("属性变化通知 Watcher 执行更新视图函数");
  this.subs.forEach(sub => {
    // 调用每一个watcher的更新函数
    sub.update();
  });
};

Dep.target = null;

// 尝试一下 会打印’属性变化通知 Watcher 执行更新视图函数‘
var modeng = {
  age: 18
};
observer(modeng);
modeng.age = 20;
