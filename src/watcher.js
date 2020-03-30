import { Dep } from "./observer";
class Watcher {
  constructor(vm, prop, callback) {
    this.prop = prop;
    this.$vm = vm;
    this.callback = callback;
    this.value = this.get();
  }
  get() {
    Dep.target = this; // 将当前watcher添加到Dep上
    const value = this.$vm.$data[this.prop]; // 由于数据是监控的所以这时访问到当前属性时会触发到get方法，这时的target已经不再是null
    Dep.target = null; // 再次清空target
    return value;
  }
  // 当触发set时 会调用sub的update方法 sun就是当前的Dep.target也就是当前实例this
  update() {
    const value = this.$vm.$data[this.prop];
    const oldValue = this.value;
    if (oldValue !== value) {
      this.value = value;
      this.callback(value);
    }
  }
}

export default Watcher;
