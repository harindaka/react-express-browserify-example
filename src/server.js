(function main(){

  var express = require('express');
  var app = express();

  var path = require('path');
  app.set('view engine', 'ejs');
  
  var config = require('./Config');
  app.locals.assetRoutes = {};
  for(var route in config.assets){
    var assetConfig = config.assets[route];    
    registerAsset(app, route, assetConfig);
    fingerprintAsset(app, route, '__fingerprint');    
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
    
    if(typeof(assetConfig['template']) !== 'undefined' && assetConfig['template'] !== null){
      var template = assetConfig['template'];
      var path = require('path');
      expressApp.get(route, function(req, res){    
        res.render(path.resolve(template));
      });
    }
    else if(typeof(assetConfig['browserify']) !== 'undefined' && assetConfig['browserify'] !== null){
      var browserifyConfig = assetConfig['browserify'];
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

function fingerprintAsset(expressApp, route, query){
  var Uri = require('urijs');
  var url = new Uri(route);
  
  url.addQuery(query, '1234');
  
  expressApp.locals.assetRoutes[route] = url.toString();
}