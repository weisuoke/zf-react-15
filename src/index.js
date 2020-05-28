import React, { Component } from './react'
import ReactDOM from 'react-dom'

class Child extends Component {
  render() {
    console.log(this.props.children) // 就一个 React 元素
    const mappedChildren = React.Children.map(
      this.props.children,
      function(item, index){
        return <li key={index}>{this.name}:{item}</li>
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
        <span>A</span>
      </Child>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
