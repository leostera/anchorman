var anchorman = require('../');

describe('API', function () {
  
  it('should complain if emitting without transports', function () {
    (function () {
      anchorman.emit('test');
    }).should.throwError(/^Fail.*/);
  });

  it('should not complain if there are no transports for a channel', function () {
    (function () {
      var transports = [{publish: function () {}}];
      anchorman.on('test', transports);
      anchorman.channels['anchorman:test'] = null;
      anchorman.emit('test');
    }).should.throwError(/^Fail.*/);
  });

});