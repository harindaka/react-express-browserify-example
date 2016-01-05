(function(){
  if(process.argv.length > 3){
    var babelDir = process.argv[2];
    var jsxRoot = process.argv[3];
    var babelOptions = '';
    if(process.argv.length > 4){
      babelOptions = process.argv[4];
    }

    var jsxFiles = findFiles(jsxRoot, '.jsx');
    //console.log(jsxFiles);
    console.log('Detected ' + jsxFiles.length + ' jsx file(s).');

    var exec = require('child_process').exec;
    var path = require('path');
    for(var i=0; i < jsxFiles.length; i++){
      var child;
      var jsxFile = '' + jsxFiles[i];
      var jsFile = jsxFile.substring(0, jsxFile.length - 1);
      console.log('Compiling ' + jsxFile + ' (' + (i + 1) + ' of ' + jsxFiles.length + ')...');

      // executes `babel`
      var command = path.resolve(babelDir) + ' "' + jsxFile + '" --out-file "' + jsFile + '" ' + babelOptions;
      //console.log(command);
      child = exec(command, function (error, stdout, stderr) {
        if(stdout != null){
          console.log(stdout);
        }

        if(stderr != null){
          console.log(stderr);
        }

        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
    }

    process.exit();
  }

  function findFiles(startPath, filter){
    var results = [];
    var fs = require('fs');
    var path = require('path');
    if (fs.existsSync(startPath)){
      var files = fs.readdirSync(startPath);
      for(var i=0;i<files.length;i++){
          var filename = path.join(startPath,files[i]);
          var stat = fs.lstatSync(filename);
          if (stat.isDirectory()){
            var matchingFiles = findFiles(filename, filter); //recurse
            for(var j=0; j < matchingFiles.length; j++){
              results.push(matchingFiles[j]);
            }
          }
          else if (filename.indexOf(filter)>=0) {
            results.push(path.resolve(filename));
          };
      };
    }
    return results;
  }

})();
