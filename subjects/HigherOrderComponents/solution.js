////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMousePosition`a a "higher-order component" that sends the mouse
// position to the component as props.
//
// hint: use `event.clientX` and `event.clientY`

import React from 'react'
import { render } from 'react-dom'

const withMousePosition = (Component) => {
  return React.createClass({
    getInitialState() {
      return { x: 0, y: 0 }
    },

    handleMouseMove(event) {
      console.log(event);
      this.setState({
        x: event.clientX,
        y: event.clientY
      })
    },

    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <Component {...this.props} mouse={this.state}/>
        </div>
      )
    }
  })
}

const App = React.createClass({

  propTypes: {
    mouse: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired
    }).isRequired
  },

  render() {
    return (
      <div style={{ height: '100%' }}>
        <h1>With the mouse!</h1>
        <pre>{JSON.stringify(this.props.mouse, null, 2)}</pre>
      </div>
    )
  }

})

const AppWithMouse = withMousePosition(App)

render(<AppWithMouse/>, document.getElementById('app'))
