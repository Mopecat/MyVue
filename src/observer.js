function defineReactive(data, key, value) {
  // 递归调用 重写data的所有属性
  observer(value);
  const dep = new Dep();
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
        dep.notify();
      }
    }
  });
}

// 数据劫持
function observer(data) {
  // 因为递归调用 所以需要设置停止的断点
  if (!data || typeof data !== "object") return;
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}

export class Dep {
  static target = null;
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  // 通知方法
  notify() {
    console.log("属性变化通知 Watcher 执行更新视图函数");
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}

export default observer;
