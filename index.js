var ee2 = require('eventemitter2').EventEmitter2;
var e = new ee2({
  newListeners: false,
  delimiter:':'
})

var anchorman = {
  prefix: 'anchorman:',
  channels: {},

  broadcast: function (channel, data) {
    if(!this.channels[this.prefix+channel]) {
      throw new Error('Failed to broadcast to a channel without any transports to handle it');
    }
    e.emit(this.prefix+channel, data);
    return this;
  },

  on: function (channel, transports) {
    if(!e) throw new Error('No event emitter?!');
    if(channel) {
      channel = this.prefix+channel;
      if(!this.channels 
        || !this.channels[channel]) {
        this.channels[channel] = [];
        e.on(channel, function (data) {
          if(this.channels[channel]) {
            console.log(channel, this.channels[channel]);
            this.channels[channel].forEach(function (t) {
              t.publish(data);
            });
          }
        }.bind(this));
      }
      if(Array.isArray(transports)) {
        transports.forEach(function (t) {
          this.channels[channel].push(t);
        }.bind(this));
      } else if (typeof transports === 'function') {
        this.channels[channel].push({
          publish: transports
        });
      } else {
        this.channels[channel].push(transports);
      }
    }
    return this;
  }
};

// inherit from EventEmitter2
// require('utils').inherit(anchorman,require('eventemitter2').EventEmitter2);

module.exports = anchorman;