"use strict";

module.exports = React.createClass({
  displayName: "exports",

  getInitialState: function getInitialState() {
    return { result: new Number(this.props.startAt) };
  },
  handleClick: function handleClick() {
    var result = new Number(this.props.startAt) + new Number(this.props.incrementBy);
    this.props.onIncrementResult(result);
  },
  render: function render() {
    return React.createElement(
      "button",
      { onClick: this.handleClick },
      "++",
      this.props.incrementBy
    );
  }
});