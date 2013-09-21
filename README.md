# Anchorman
### a reporter library
![](https://si0.twimg.com/profile_images/1990249248/image.jpg)

### Motivation
I made this lib for SequelizeJS so they could easily hook up mocha reporters but it never happened. Dead small, dead simple and it works over events which is the way I considered best to be done. That's about the size of it.

### Usage
```js
// opts is an array of options
// that includes an eventemitter2 attribute
// for you to pass in ee2 params
var anchorman = require('anchorman')(opts);

// let's subscribe to some news
anchorman.on('someEvent', transports);

// now lets broadcast some news
anchorman.broadcast('someEvent', {some: 'data'});

// transports can be just a function
anchorman.on('someOtherEvent', function (data) {
  console.log(data);
});

// transports can be objects that implement a publish function
var transportObject = {
  someData: 'blabla',
  publish: function (data) {

  }
};

anchorman.on('someOtherEvent', transportObject);

// or they can be an array of transport objects
var transportsArray = [
  consoleTransport,
  fileTransport,
  emailTransport
];

anchorman.on('someEvent', transportsArray);
```