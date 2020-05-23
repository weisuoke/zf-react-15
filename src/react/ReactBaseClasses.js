let emptyObject = {}

class Component {

  constructor(props, context) {
    this.props = props
    this.context = context
    this.refs = emptyObject
  }
}

// 在 React 内部是凭这个变量来判断是不是一个 React 组件的
// 因为在组件定义的时候有两种方式, 一种是类组件，一种是函数组件，都被 babel 编译成函数
// 编译后后通过 isReactComponent 来判断的
Component.prototype.isReactComponent = {}

class PureComponent extends Component {

}

PureComponent.prototype.isPureReactComponent = true

export { Component }
