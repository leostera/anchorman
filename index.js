var EventEmitter2 = require('eventemitter2').EventEmitter2;

var e = new EventEmitter2({
  newListeners: false,
  delimiter:':'
});

module.exports = {
  prefix: 'anchorman:',
  channels: {},

  emit: function (channelName, data) {
    if(!this.channels[channelName]) {
      throw new Error('Failed to emit to a channel without any transports to handle it');
    }
    e.emit(this.prefix+channelName, data);
    return this;
  },

  on: function (channelName, transports) {
    if(channelName) {
      channelName = this.prefix+channelName;
      if(!this.channels 
        || !this.channels[channelName]) {
        this.channels[channelName] = [];
      }
      if(Array.isArray(transports)) {
        transports.forEach(function (t) {
          this.channels[channelName].push(t);
        }.bind(this));
      } else {
        this.channels[channelName].push(transports);
      }
      e.on(channelName, function (data) {
        if(this.channels[channelName]) {
          this.channels[channelName].forEach(function (t) {
            t.publish(data);
          });
        }
      }.bind(this));
    }
    return this;
  }
};