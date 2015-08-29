var fs = module.exports = require('vigour-fs')
  , Promise = require('bluebird');

Promise.promisifyAll(fs);

fs.existsAsync = function(file){
  return fs.statAsync(file)
    .then(function(stat){
      return true;
    })
    .catch(function(){
      return false;
    });
};