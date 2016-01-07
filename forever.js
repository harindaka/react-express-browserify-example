(function Bootstrapper(){
    'use strict';

  console.log("Setting up Forever...");

  var path = require('path');

  var forever = require('forever-monitor');
  var restarts = 3;
  var child = new (forever.Monitor)(path.resolve('./src/server.js'), {
    command: process.execPath + ' --harmony',
    minUptime: 1000,
    spinSleepTime: 1000,
    killTree: true,
    silent: false,
    args: []
  });

  child.on('exit', function () {
    console.log('./src/server.js exited after ' + restarts + ' restarts');
  });

  child.on('restart', function() {
    console.error('Forever restarting script for ' + child.times + ' time...');
  });

  child.on('exit:code', function(code) {
    console.error('Forever detected script exited with code ' + code);
  });

  console.log("Starting application with Forever...");
  child.start();

})();
