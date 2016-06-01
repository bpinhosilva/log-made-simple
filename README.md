# log-made-simple
Simple logger for Node.JS

#### Features

* New files are created automatically when the day changes.
* Set labels for your messages;

### Installation

```javascript
$ npm install log-made-simple --save
```

#### Quick example
```javascript
var log = require('log-made-simple');
log.debug("My app is running...");

// will produce:
[DEBUG] May 31st 2016, 11:51:53 pm: My app is running...
```

#### Reference
### Basic methods
```javascript
log.info('Useful information');
log.warn('Be aware that something is going on...');
log.error('App has crashed...');
log.debug('Just checking around.');
```
##### setLabel(String)
You can use it to add some label to your log message.
Example: 
```javascript
log.setLabel('app');
log.debug('Running...');

// will produce
[DEBUG] [app] June 1st 2016, 12:17:18 am: Running...
```

##### setOutputFile(Boolean)
You can enable or not log file (default enabled).

##### setDebugMode(Boolean)
If you do not want to log messages to your terminal, set it to false (default true).

### Changelog

Version 1.0.1 (June 1st, 2016)
* Added printf format string style to logger;
* Fixed flag options when creating stream.


Version 1.0.0 (May 31st, 2016)
* First release with basic usage.


### License
Please, read the License file on this repository for more information.

### Do you like it? 
Start contributing by forking and sending pull request.
