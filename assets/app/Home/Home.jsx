var react = require('react');
var reactDom = require('react-dom');

var CustomButton = react.createClass({
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

var IncrementResult = react.createClass({
  getInitialState: function(){
    return {};
  },
  render: function(){
    return (
      <span>{this.props.result}</span>
    );
  }
});

var Incrementor = react.createClass({
  getInitialState: function(){
    return { result: 0 };
  },
  handleIncrementResult: function(result){
    this.setState({result: result});
  },
  render: function(){
    return (
      <div>
      <CustomButton onIncrementResult={this.handleIncrementResult} startAt={this.state.result} incrementBy="1"/>&nbsp;
      <CustomButton onIncrementResult={this.handleIncrementResult} startAt={this.state.result} incrementBy="10"/>&nbsp;
      <CustomButton onIncrementResult={this.handleIncrementResult} startAt={this.state.result} incrementBy="100"/>
      <br/>
      <IncrementResult result={this.state.result}/>
      </div>
    );
  }
});

react.render(<Incrementor/>, document.getElementById("content"));
