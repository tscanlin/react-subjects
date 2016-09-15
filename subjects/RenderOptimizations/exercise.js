////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to
//   prevent tearing when scrolling quickly
// - Remember scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import * as RainbowListDelegate from './RainbowListDelegate'
import './styles'

const ListView = React.createClass({
  propTypes: {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
        containerHeight: 0,
        containerScroll: 0
    }
  },

  // tall window, scrollTop

  componentDidMount() {
      this.getContainerHeight()
  },

  getContainerHeight() {
    this.setState({ containerHeight: findDOMNode(this).clientHeight })
  },

  itemsToRender() {
    return Math.floor(this.state.containerHeight / this.props.rowHeight) + 1
  },

  onScroll(e) {
    //   console.log(e.target.scrollTop);
      this.setState({ containerScroll: e.target.scrollTop })
  },

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props
    const totalHeight = numRows * rowHeight

    const items = []

    // console.log(this.itemsToRender());
    let index = 0
    const startIndex = Math.floor(this.state.containerScroll / rowHeight)
    const offset = 5
    // console.log(index);
    while (index < 500) {
        if (index >= startIndex - offset && index <= startIndex + this.itemsToRender() + offset) {
            items.push(<li key={index} style={{
                position: 'absolute',
                top: index * rowHeight
            }}>{renderRowAtIndex(index)}</li>)
        }
      index++
    }

    return (
      <div style={{ height: '100%', overflowY: 'scroll', position: 'relative' }}
        onScroll={this.onScroll}>
        <ol style={{ height: totalHeight }}>
          {items}
        </ol>
      </div>
    )
  }
})

render(
  <ListView
    numRows={500}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById('app')
)
