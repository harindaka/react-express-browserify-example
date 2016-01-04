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
  var reactModules = ['react', 'react-dom'];
  app.get('/assets/react', browserify(reactModules));

  var appBrowserifyParam = {};
  appBrowserifyParam[path.resolve('./assets/app/app.js')] = { run: false, expose: 'app' };
  appBrowserifyParam[path.resolve('./assets/app/Home/Home.js')] = { run: true, expose: 'home' };
  app.get('/assets/app', browserify([
    appBrowserifyParam
  ]));

  var server = app.listen(3000, function () {
  var port = server.address().port;

    console.log('Server listening on port %s', port);
  });

})();
