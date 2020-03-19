// watcher主要是接收属性的变化，然后执行更新函数 更新视图
/**
 * 主要就两步
 * 1.将Watcher添加到统一管理watcher的dep里
 * 2.接收通知，执行更新函数
 */

function Watcher(vm, prop, callback) {
  this.vm = vm;
  this.prop = prop;
  this.callback = callback;
  this.vallue = this.get();
}

Watcher.prototype = {
  update() {
    const value = this.vm.$data[this.prop];
    const oldVal = this.value;
    // 如果不一样 则证明修改了，这样则重新赋值并调用回调函数
    if (value !== oldVal) {
      this.value = value;
      this.callback(value);
    }
  },
  get() {
    Dep.target = this; //储存订阅器
    const value = this.vm.$data[this.prop]; //因为属性被监听，这一步会执行监听器里的 get方法 这时的Dep.target就不是null了
    // 添加完依赖后清空target
    Dep.target = null;
    return value;
  }
};
