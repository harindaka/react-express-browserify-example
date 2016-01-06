module.exports = function(){
  var self = this;

  this.testMethod = function() {
    alert('This is a test method inside an exported function called via "require"');
  };
};
