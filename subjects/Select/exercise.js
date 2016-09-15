import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import './styles.css'

const { func, any } = PropTypes


////////////////////////////////////////////////////////////////////////////////
// Requirements
//
// Make this work like a normal <select><option/></select>

const Select = React.createClass({
  propTypes: {
    onChange: func,
    value: any,
    defaultValue: any
  },

  childContextTypes: {
      select: PropTypes.shape({
          currentValue: any,
          onChange: any
      })
  },

  getDefaultProps() {
    return {
        onChange: (currentValue) => {
            this.setState({ currentValue })
        }
    }
  },

  getChildContext() {
    return {
        select: {
            currentValue: this.props.value,
            onChange: this.props.onChange
        }
    }
  },

  getInitialState() {
    return {
        currentValue: this.props.defaultValue
    }
  },

  isUncontrolled() {
    return this.props.value == null
  },

  render() {
    return (
      <div className="select">
        <div className="label">label <span className="arrow">▾</span></div>
        <div className="options">
          {this.props.children}
        </div>
      </div>
    )
  }
})


const Option = React.createClass({
  contextTypes: {
      select: PropTypes.shape({
          currentValue: any,
          onChange: any
      })
  },
  render() {
    return (
      <div className="option" onClick={() => { this.context.select.onChange(this.props.value) } } style={{
          fontWeight: this.props.value === this.context.select.currentValue
            ? 'bold' : 'normal' }}
        >{this.props.children}</div>
    )
  }
})

const App = React.createClass({
  getInitialState() {
    return {
      selectValue: 'dosa'
    }
  },

  render() {
    return (
      <div>
        <h1>Select/Option</h1>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>

        <h2>Controlled</h2>
        <p>
          <button onClick={this.setToMintChutney}>Set to Mint Chutney</button>
        </p>

        <Select
          value={this.state.selectValue}
          onChange={(selectValue) => this.setState({ selectValue })}
        >
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>

        <h2>Uncontrolled</h2>
        <Select defaultValue="tikka-masala">
          <Option value="tikka-masala">Tikka Masala</Option>
          <Option value="tandoori-chicken">Tandoori Chicken</Option>
          <Option value="dosa">Dosa</Option>
          <Option value="mint-chutney">Mint Chutney</Option>
        </Select>
      </div>
    )
  }
})

render(<App/>, document.getElementById('app'))
