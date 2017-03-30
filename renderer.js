// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var childProcess = require('child_process');
var Q = require('q');


var phpSwitch = document.getElementById('switch-php');
var mysqlSwitch = document.getElementById('switch-mysql');


var nginxProgram = {
	target: null,
	isRunning: function() {
		var deferred = Q.defer();
		childProcess.exec('ps -ef | grep nginx | wc -l', function (error, stdout, stderr) {
			if (!error) {
				if(stdout > 2) {
					deferred.resolve(true);
				} else {
					deferred.resolve(false);
				}
			}
			deferred.reject(error);
		});
		return deferred.promise;
	},
	operateSwitch: function(status) {
		if(!this.target) {
			this.target = document.getElementById('txt-nginx');
		}
		this.target.innerText = status ? ' √' : 'X';
	}
}

setInterval(() => {
	nginxProgram.isRunning().then((res) => {
		nginxProgram.operateSwitch(res)

	}).catch((error) => {
		console.log(error);
	});
}, 1500);
