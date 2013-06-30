# Anchorman
### a reporter transport library over events

![](https://si0.twimg.com/profile_images/1990249248/image.jpg)

### Actual interface
```js
var anchorman = require('anchorman');
anchorman.on('someEvent', transportsArray);
anchorman.emit('someEvent', {some: 'data'});
```

### Proposed interface
```js
// opts is an array of options
// that includes an eventemitter2 attribute
// for you to pass in ee2 params
var anchorman = require('anchorman')(opts);

// let's subscribe to some news
anchorman.on('someEvent', transportsArray);

// now lets broadcast some news
anchorman.broadcast('someEvent', {some: 'data'});
```

Made with <3 by Leandro Ostera