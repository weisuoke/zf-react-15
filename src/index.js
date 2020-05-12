import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  render() {
    return (
      <div>
        <p>1</p>
        <button>+</button>
      </div>
    )
  }
}

let element = <App/>

ReactDOM.render(element, document.getElementById('root'))
