(function main(){

  var express = require('express');
  var app = express();

  var path = require('path');
  app.get('/', function(req, res){
    res.sendFile(path.resolve('./src/index.html'));
  });

  app.get('/lib/site.css', function(req, res){
    res.sendFile(path.resolve('./lib/site.css'));
  });

  app.get('/lib/jquery/jquery.js', function(req, res){
    res.sendFile(path.resolve('./node_modules/jquery/dist/jquery.js'));
  });

  app.get('/lib/bootstrap/css/bootstrap.css', function(req, res){
    res.sendFile(path.resolve('./node_modules/bootstrap/dist/css/bootstrap.css'));
  });
  app.get('/lib/bootstrap/css/bootstrap-theme.css', function(req, res){
    res.sendFile(path.resolve('./node_modules/bootstrap/dist/css/bootstrap-theme.css'));
  });
  app.get('/lib/bootstrap/fonts/glyphicons-halflings-regular.eot', function(req, res){
    res.sendFile(path.resolve('./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot'));
  });
  app.get('/lib/bootstrap/fonts/glyphicons-halflings-regular.svg', function(req, res){
    res.sendFile(path.resolve('./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg'));
  });
  app.get('/lib/bootstrap/fonts/glyphicons-halflings-regular.ttf', function(req, res){
    res.sendFile(path.resolve('./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'));
  });
  app.get('/lib/bootstrap/fonts/glyphicons-halflings-regular.woff', function(req, res){
    res.sendFile(path.resolve('./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff'));
  });
  app.get('/lib/bootstrap/fonts/glyphicons-halflings-regular.woff2', function(req, res){
    res.sendFile(path.resolve('./node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'));
  });
  app.get('/lib/bootstrap/js/bootstrap.js', function(req, res){
    res.sendFile(path.resolve('./node_modules/bootstrap/dist/js/bootstrap.js'));
  });

  var browserify = require('browserify-middleware');
  browserify.settings.mode = 'development';
  app.get('/lib/react', function(req, res){
    res.sendFile(path.resolve('./node_modules/react/dist/react.js'));
  });
  app.get('/lib/react-dom', function(req, res){
    res.sendFile(path.resolve('./node_modules/react-dom/dist/react-dom.js'));
  });

  var componentsBundle = {};
  componentsBundle[path.resolve('./lib/components/Home/Incrementor.js')] = { run: false, expose: 'components/Home/Incrementor' };
  app.get('/lib/components', browserify([
    'classnames',
    componentsBundle
  ]));

  var utilsBundle = {};
  utilsBundle[path.resolve('./src/utils/TestUtil.js')] = { run: false, expose: 'utils/TestUtil' };
  app.get('/lib/utils', browserify([
    utilsBundle
  ]));



  var server = app.listen(3000, function() {
  var port = server.address().port;

    console.log('Server listening on port %s', port);
  });

})();
