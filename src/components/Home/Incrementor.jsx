var CustomButton = require('./CustomButton');
var IncrementResult = require('./IncrementResult');

module.exports = React.createClass({
  getInitialState: function(){
    return { result: 0 };
  },
  handleIncrementResult: function(result){
    this.setState({result: result});
  },
  render: function(){
    var centerBoldTextStyle = {
      textAlign: 'center',
      fontWeight: 'bold'
    };

    return (
      <div>
        <CustomButton onIncrementResult={this.handleIncrementResult} startAt={this.state.result} incrementBy="1"/>&nbsp;
        <CustomButton onIncrementResult={this.handleIncrementResult} startAt={this.state.result} incrementBy="10"/>&nbsp;
        <CustomButton onIncrementResult={this.handleIncrementResult} startAt={this.state.result} incrementBy="100"/>
        <br/>
        <br/>
        <div style={centerBoldTextStyle}>
          <IncrementResult result={this.state.result}/>
        </div>
      </div>
    );
  }
});
