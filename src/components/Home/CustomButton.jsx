var classnames = require('classnames');

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
      <button className={classnames('custombtn', 'custombtn:hover')} onClick={this.handleClick}>++{this.props.incrementBy}</button>
    );
  }
});
