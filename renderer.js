// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var childProcess = require('child_process');

var ls = childProcess.exec('cat *.js | wc', function (error, stdout, stderr) {
   if (error) {
     console.log(error.stack);
     console.log('Error code: '+error.code);
   }
   console.log('Child Process STDOUT: '+stdout);
});