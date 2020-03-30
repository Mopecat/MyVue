import observer from './observer'
import Watcher from './watcher'
import Complie from './complie'
/**
 * desc
 * @param {type} parameter options
 * @returns {type} 返回值描述
 */
class MyVue {
  constructor(options, prop) {
    this.$options = options
    this.$data = options.data
    this.$prop = prop
    this.$el = document.querySelector(options.el)
    console.log(this.$el)
    this.init()
  }
  init() {
    observer(this.$data)
    new Complie(this)
    // this.$el.textContent = this.$data[this.$prop]
    // new Watcher(this, this.$prop, value => {
    //   console.log('更新的回调函数')
    //   this.$el.textContent = value
    // })
  }
}

export default MyVue
