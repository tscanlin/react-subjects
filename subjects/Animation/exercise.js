///////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Use a <Motion> to animate the transition of the red "marker" to its
//   destination when it is dropped
//
// Got extra time?
//
// - If you didn't already, use a custom spring to give the animation
//   an elastic, bouncy feel
// - Add a "drop hint" element that indicates which element will receive
//   the marker when it is dropped to improve usability
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import { Motion, spring } from 'react-motion'
import Draggable from './utils/Draggable'
import './styles'

const DropGrid = React.createClass({
  getInitialState() {
    return {
      isDraggingMarker: false,
      startX: 0,
      startY: 0,
      mouseX: 0,
      mouseY: 0
    }
  },

  getRelativeXY({ clientX, clientY }) {
    const { offsetLeft, offsetTop } = findDOMNode(this)

    return {
      x: clientX - offsetLeft,
      y: clientY - offsetTop
    }
  },

  handleDragStart(event) {
    const { x, y } = this.getRelativeXY(event)
    const { offsetLeft, offsetTop } = event.target

    // Prevent Chrome from displaying a text cursor
    event.preventDefault()

    this.setState({
      isDraggingMarker: true,
      startX: x - offsetLeft,
      startY: y - offsetTop,
      mouseX: x,
      mouseY: y
    })
  },

  handleDrag(event) {
    const { x, y } = this.getRelativeXY(event)

    this.setState({
      mouseX: x,
      mouseY: y
    })
  },

  handleDrop() {
    this.setState({ isDraggingMarker: false })
  },

  render() {
    const { isDraggingMarker, startX, startY, mouseX, mouseY } = this.state

    let markerLeft, markerTop
    if (isDraggingMarker) {
      markerLeft = mouseX - startX
      markerTop = mouseY - startY
    } else {
      markerLeft = Math.floor(Math.max(0, Math.min(449, mouseX)) / 150) * 150
      markerTop = Math.floor(Math.max(0, Math.min(449, mouseY)) / 150) * 150
    }

    const markerStyle = {
      left: markerLeft,
      top: markerTop
    }

    return (
      <div className="grid">
        <Motion style={{
            left: spring(markerStyle.left),
            top: spring(markerStyle.top)
        }}>
            {style => {
                return (
                    <Draggable
                        className="marker"
                        style={style}
                        onDragStart={this.handleDragStart}
                        onDrag={this.handleDrag}
                        onDrop={this.handleDrop}
                    />
                )
            }}
        </Motion>
        <div className="cell">1</div>
        <div className="cell">2</div>
        <div className="cell">3</div>
        <div className="cell">4</div>
        <div className="cell">5</div>
        <div className="cell">6</div>
        <div className="cell">7</div>
        <div className="cell">8</div>
        <div className="cell">9</div>
      </div>
    )
  }
})

render(<DropGrid/>, document.getElementById('app'))
