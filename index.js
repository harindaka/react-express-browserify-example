(function main(){

  var express = require('express');
  var app = express();

  var path = require('path');
  app.get('/', function(req, res){
    res.sendFile(path.resolve('./index.html'));
  });

  app.get('/script.js', function(req, res){
    res.sendFile(path.resolve('./script.js'));
  });

  var browserify = require('browserify-middleware');
  browserify.settings.mode = 'development';
  app.get('/lib/react', function(req, res){
    res.sendFile(path.resolve('./node_modules/react/dist/react.js'));
  });
  app.get('/lib/react-dom', function(req, res){
    res.sendFile(path.resolve('./node_modules/react-dom/dist/react-dom.js'));
  });

  var reactComponents = {};
  reactComponents[path.resolve('./src/utils/TestUtil.js')] = { run: false, expose: 'App.TestUtil' };
  reactComponents[path.resolve('./lib/components/Home/Incrementor.js')] = { run: false, expose: 'App.Incrementor' };
  app.get('/lib/utils', browserify([
    reactComponents
  ]));

  var server = app.listen(3000, function() {
  var port = server.address().port;

    console.log('Server listening on port %s', port);
  });

})();
