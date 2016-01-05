module.exports = React.createClass({
  getInitialState: function(){
    return { result: new Number(this.props.startAt) };
  },
  handleClick: function(){
    var result = new Number(this.props.startAt) + new Number(this.props.incrementBy);
    this.props.onIncrementResult(result);
  },
  render: function(){
    return (
      <button onClick={this.handleClick}>++{this.props.incrementBy}</button>
    );
  }
});
