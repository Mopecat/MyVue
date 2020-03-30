import Watcher from './watcher'

class Complie {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el
    this.fragment = null
    this.init()
  }
  init() {
    this.fragment = this.nodeFragment(this.el)
    this.compileNode(this.fragment)
  }
  nodeFragment(el) {
    const fragment = document.createDocumentFragment()
    let child = el.firstChild
    console.log(child)
    while (child) {
      // appendChild 不仅仅会追加 也可以将一个元素的节点移动到另一个元素
      fragment.appendChild(child)
      child = el.firstChild
    }
    return fragment
  }
  compileNode(fragment) {
    let nodes = fragment.childNodes
    // 循环nodes 判断节点不同再编译节点
    nodes.forEach(node => {})
  }
}

export default Complie
