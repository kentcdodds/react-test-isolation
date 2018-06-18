import React from 'react'

class Counter extends React.Component {
  static defaultProps = {
    initialCount: 0,
    maxClicks: 3,
  }
  initialState = {count: this.props.initialCount}
  state = this.initialState
  handleReset = () => this.setState(this.initialState)
  handleClick = () =>
    this.setState(
      ({count}) => (this.clicksAreTooMany(count) ? null : {count: count + 1}),
    )
  clicksAreTooMany(count) {
    return count >= this.props.maxClicks
  }
  render() {
    const {count} = this.state
    const tooMany = this.clicksAreTooMany(count)
    return (
      <div>
        <button onClick={this.handleClick} disabled={tooMany}>
          Count: {count}
        </button>
        {tooMany ? <button onClick={this.handleReset}>reset</button> : null}
      </div>
    )
  }
}

export {Counter}
