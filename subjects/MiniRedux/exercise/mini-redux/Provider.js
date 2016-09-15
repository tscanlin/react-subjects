import React from 'react'

const Provider = React.createClass({
    getChildContext() {
        return {
            store: this.props.store
        }
    },

    childContextTypes: {
            store: React.PropTypes.object
    },

  render() {
    return <div>{React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
            dispatch: this.props.store.dispatch
        })
    })}</div>
  }
})

export default Provider
