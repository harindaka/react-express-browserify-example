"use strict";

module.exports = React.createClass({
  displayName: "exports",

  getInitialState: function getInitialState() {
    return {};
  },
  render: function render() {
    return React.createElement(
      "span",
      null,
      this.props.result
    );
  }
});