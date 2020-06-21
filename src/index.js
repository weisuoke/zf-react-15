import React, { Component } from './react'
import ReactDOM from 'react-dom'

// 把原来的 children 打平成一级，然后把映射后的结果打平成一级
class Child extends Component {
  render() {
    console.log(this.props.children) // 就一个 React 元素
    const mappedChildren = React.Children.map(
      this.props.children,
      function(item, index){
        // return <li key={index}>{this.name}:{item}</li>
        return [item, [item, [item, [item]]]]
      },
      {name: '我是上下文对象'}
    )
    console.log(mappedChildren)
    return (
      <div>
        {mappedChildren}
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Child>
        {[<span>A</span>,<span>B</span>]}
        {[<span>C</span>,<span>D</span>]}
      </Child>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
