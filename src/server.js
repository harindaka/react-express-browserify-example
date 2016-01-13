(function main(){

  var express = require('express');
  var app = express();

  var path = require('path');

  var config = require('./Config');
  for(var route in config.assets){
    var routeDefinition = config.assets[route];    
    registerAsset(app, route, routeDefinition);    
  }

  var server = app.listen(3000, function() {
  var port = server.address().port;

    console.log('Server listening on port %s', port);
  });

})();

function registerAsset(expressApp, route, routeDefinition){
  var rdType = typeof(routeDefinition);
  if(rdType === 'string'){   
    var path = require('path');

    expressApp.get(route, function(req, res){    
      res.sendFile(path.resolve(routeDefinition));        
    });
  }
  else if(routeDefinition !== null && rdType === 'object'){
    if(typeof(routeDefinition['browserify']) !== 'undefined' && routeDefinition['browserify'] !== null){
      var browserify = require('browserify-middleware');
      browserify.settings.mode = 'development'; 

      expressApp.get(route, browserify(routeDefinition['browserify']));
    }
  }
  else{
    throw new Error('Invalid route definition specified for asset ' + route + '.');
  }
}