(function main(){

  var express = require('express');
  var app = express();

  var path = require('path');
  app.set('view engine', 'ejs');
  
  var config = require('./Config');
  app.locals.assets = {};
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
  var fingerprintQueryKey = '__fingerprint';
  var rdType = typeof(assetConfig);
  if(rdType === 'string'){   
    var path = require('path');
    var assetFile = path.resolve(assetConfig);
    fingerprintAsset(expressApp, route, [assetFile], fingerprintQueryKey); 
    expressApp.get(route, function(req, res){    
      res.sendFile(assetFile);        
    });
  }
  else if(assetConfig !== null && rdType === 'object'){
    
    if(typeof(assetConfig['template']) !== 'undefined' && assetConfig['template'] !== null){
      var template = assetConfig['template'];
      var path = require('path');
      var assetFile = path.resolve(template);
      fingerprintAsset(expressApp, route, [assetFile], fingerprintQueryKey); 
      expressApp.get(route, function(req, res){    
        res.render(assetFile);
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

        fingerprintAsset(expressApp, route, null, null);

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

function fingerprintAsset(expressApp, route, files, query){
  var Uri = require('urijs');
  var url = new Uri(route);
  
  if(typeof(files) !== 'undefined' && files !== null && files.length > 0){
    var hashFiles = require('hash-files');
    var fingerprint = hashFiles.sync({ files:files, algorithm:'md5' });

    url.addQuery(query, fingerprint);
  }

  expressApp.locals.assets[route] = url.toString();
}