import React, { Component } from './react'
import ReactDOM from 'react-dom'

class App extends Component {
  static defaultProps = {
    name: 'app'
  }

  render() {
    let returnElement = React.createElement(
      'div',
      {id: this.props.name + '_' + this.props.title},
      React.createElement('p', null, '1'),
      React.createElement('button', null, '+')
    )
    console.log(returnElement)
    return returnElement
  }
}

let element = React.createElement(App, { title: 'zhufeng' })

ReactDOM.render(element, document.getElementById('root'))
