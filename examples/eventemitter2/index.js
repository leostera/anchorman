// Anchorman setup
var anchorman = require('anchorman');

var consoleReporter = {
  publish: function (data) {
    console.log(data);
  }
};

anchorman.on('diehard', consoleReporter );

// In a regular EventEmitter2 setup
// you would have somethin like this
// 
// var e = require('eventemitter2').EventEmitter2;
// var app = new e(opts);
// app.emit('diehard');
// 
// if you do, you just can just replace
// var app = new e(opts);
// with
// var app = require('anchorman')(opts);
// 
// in this case we already initialized anchorman
// up top, so we just assign it to our app variable
var app = anchorman;
app.emit('diehard', 'Yippee Ki Yay!');
app.emit('diehard', 'Motherfucker!');
