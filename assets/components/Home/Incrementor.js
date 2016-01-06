'use strict';

var CustomButton = require('./CustomButton');
var IncrementResult = require('./IncrementResult');

module.exports = React.createClass({
  displayName: 'exports',

  getInitialState: function getInitialState() {
    return { result: 0 };
  },
  handleIncrementResult: function handleIncrementResult(result) {
    this.setState({ result: result });
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(CustomButton, { onIncrementResult: this.handleIncrementResult, startAt: this.state.result, incrementBy: '1' }),
      ' ',
      React.createElement(CustomButton, { onIncrementResult: this.handleIncrementResult, startAt: this.state.result, incrementBy: '10' }),
      ' ',
      React.createElement(CustomButton, { onIncrementResult: this.handleIncrementResult, startAt: this.state.result, incrementBy: '100' }),
      React.createElement('br', null),
      React.createElement(IncrementResult, { result: this.state.result })
    );
  }
});