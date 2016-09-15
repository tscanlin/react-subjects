/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> "submits" the form
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onChange> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
//
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render } from 'react-dom'

const Form = React.createClass({
childContextTypes: {
  form: PropTypes.shape({
      onSubmit: PropTypes.func
  })
},
  getChildContext() {
    return {
        form: {
            onSubmit: (e) => { this.props.onSubmit(e) }
        }
    }
  },
  render() {
    return <div>{this.props.children}</div>
  }
})

const SubmitButton = React.createClass({
  contextTypes: {
    form: PropTypes.shape({
        onSubmit: PropTypes.func
    })
  },
  render() {
    return <button onClick={() => {this.context.form.onSubmit()}}>{this.props.children}</button>
  }
})

const TextInput = React.createClass({
    contextTypes: {
      form: PropTypes.shape({
          onSubmit: PropTypes.func
      })
    },
  render() {
    return (
      <input
        onKeyDown={(e) => {
            if (e.keyCode === 13) {
                this.context.form.onSubmit()
            }
        }}
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
      />
    )
  }
})

const App = React.createClass({
  handleSubmit() {
    alert('YOU WIN!')
  },

  render() {
    return (
      <div>
        <h1>This isn't even my final <code>&lt;Form/&gt;</code>!</h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name"/> {' '}
            <TextInput name="lastName" placeholder="Last Name"/>
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    )
  }
})

render(<App/>, document.getElementById('app'))
