import React from 'react'

export default function connect(mapStateToProps) {
  return function (Component) {
      return React.createClass({
          getInitialState() {
            return {
                state: this.context.store.getState()
            }
          },

          contextTypes: {
            store: React.PropTypes.object
          },

          componentWillMount() {
              const store = this.context.store
                store.listen(() => {
                    this.setState({
                        state: store.getState()
                    })
                })
          },

          render() {
              const props = mapStateToProps(this.context.store.getState())
              return <Component {...props} dispatch={this.context.store.dispatch} />
          }
      })
  }
}
