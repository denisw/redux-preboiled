import React, { FC } from 'react'
import { connect } from 'react-redux'
import {
  CounterState,
  increment,
  decrement,
  multiply
} from './redux/counter.redux'

interface StateProps {
  counter: number
}

interface DispatchProps {
  increment: () => void
  decrement: () => void
  multiply: (factor: number) => void
}

type Props = StateProps & DispatchProps

const App: FC<Props> = ({ counter, increment, decrement, multiply }) => (
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

const mapStateToProps = (state: CounterState): StateProps => ({
  counter: state
})

const mapDispatchToProps: DispatchProps = {
  increment,
  decrement,
  multiply
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
