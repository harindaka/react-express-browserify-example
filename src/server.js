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
    var browserifyConfig = routeDefinition['browserify'];
    if(typeof(browserifyConfig) !== 'undefined' && browserifyConfig !== null){
      
      var browserifyModules = browserifyConfig['modules'];
      if(typeof(browserifyModules) !== 'undefined' && browserifyModules !== null){
        var browserify = require('browserify-middleware');
        browserify.settings.mode = 'production';

        var browserifyOptions = browserifyConfig['options'];
        if(typeof(browserifyOptions) === 'undefined' || browserifyOptions === null){          
          browserifyOptions = {
            cache: false,
            precompile: false,
            minify: false,
            gzip: false,
            debug: true
          };
        } 
        browserifyOptions.mode = 'production';  

        expressApp.get(route, browserify(browserifyModules, browserifyOptions));
      }
      else{
        throw new Error('Invalid route definition specified for asset ' + route + '.');
      }            
    }
    else{
      throw new Error('Invalid route definition specified for asset ' + route + '.');
    }
  }
  else{
    throw new Error('Invalid route definition specified for asset ' + route + '.');
  }
}

