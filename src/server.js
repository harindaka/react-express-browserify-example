(function main(){

  var express = require('express');
  var app = express();

  var path = require('path');

  var config = require('./Config');
  for(var route in config.assets){
    var assetConfig = config.assets[route];    
    registerAsset(app, route, assetConfig);    
  }

  var server = app.listen(3000, function() {
  var port = server.address().port;

    console.log('Server listening on port %s', port);
  });

})();

function registerAsset(expressApp, route, assetConfig){
  var rdType = typeof(assetConfig);
  if(rdType === 'string'){   
    var path = require('path');

    expressApp.get(route, function(req, res){    
      res.sendFile(path.resolve(assetConfig));        
    });
  }
  else if(assetConfig !== null && rdType === 'object'){
    var browserifyConfig = assetConfig['browserify'];
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

