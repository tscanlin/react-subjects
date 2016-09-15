////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// This Modal, even though its a React component, has an imperative API to
// open and close it. Can you convert it to a declarative API?
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import $ from 'jquery'
import 'bootstrap-webpack'

const Modal = React.createClass({

  propTypes: {
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node
  },

  triggerModal() {
      const method = this.props.isOpen
        ? 'show'
        : 'hide'

      $(findDOMNode(this)).modal(method)
  },

  componentDidMount() {
      this.triggerModal()
  },
  componentDidUpdate() {
      this.triggerModal()
  },

  render() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }

})

const App = React.createClass({

  getInitialState() {
    return {
        isModalOpen: true
    }
  },

  openModal() {
    this.setState({ isModalOpen: true })
  },

  closeModal() {
    this.setState({ isModalOpen: false })
  },

  render() {
    return (
      <div className="container">
        <h1>Let’s make bootstrap modal declarative</h1>

        <button
          className="btn btn-primary"
          onClick={this.openModal}
        >open modal</button>

        <Modal
            ref="modal"
            title="Declarative is better"
            isOpen={this.state.isModalOpen}
        >
          <p>Calling methods on instances is a FLOW not a STOCK!</p>
          <p>It’s the dynamic process, not the static program in text space.</p>
          <p>You have to experience it over time, rather than in snapshots of state.</p>
          <button
            onClick={this.closeModal}
            type="button"
            className="btn btn-default"
          >Close</button>
        </Modal>

      </div>
    )
  }

})

render(<App/>, document.getElementById('app'))
