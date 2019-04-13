import React from 'react'
import { connect } from 'react-redux'
import { increment, decrement, multiply } from './redux/counter.redux'

const App = ({ counter, increment, decrement, multiply }) => (
  <div style={{ paddingLeft: '32px' }}>
    <p>
      Counter value: <b>{counter}</b>
    </p>
    <div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={() => multiply(2)}>x2</button>
    </div>
  </div>
)

const mapStateToProps = state => ({
  counter: state
})

const mapDispatchToProps = {
  increment,
  decrement,
  multiply
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
