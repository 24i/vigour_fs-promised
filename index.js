var fs = module.exports = require('vigour-fs')
  , Promise = require('bluebird');

Promise.promisifyAll(fs);
