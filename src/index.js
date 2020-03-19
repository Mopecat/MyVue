// MyVue的原型
function MyVue(options, prop) {
  this.$options = options;
  this.$data = options.data;
  this.$prop = prop;
  this.$el = document.querySelector(options.el);
  this.init();
}

MyVue.prototype.init = function() {
  // 将数据劫持重写
  observer(this.$data);
  // 赋值挂在元素的文字
  this.$el.textContent = this.$data[this.$prop];
  // 添加watcher
  new Watcher(this, this.$prop, value => {
    this.$el.textContent = value;
  });
};
