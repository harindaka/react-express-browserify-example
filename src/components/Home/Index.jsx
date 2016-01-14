var Incrementor = require('./Incrementor');

module.exports = React.createClass({
  getInitialState: function(){
    return {};
  },
  render: function(){
    var centerTextStyle = {
      textAlign: 'center'
    };

    return (
      <div style={centerTextStyle}>
      <p>Node Express - React - Browserify Example</p>
      <Incrementor/>
      <br/>
      <Incrementor/>
      </div>
    );
  }
});
