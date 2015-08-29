var fs = require('../..')
  , path = require('path')
  , existingFile = path.join(__dirname, 'async.js')
  , nonExistingFile = path.join(__dirname, 'non-existing-file.js');


describe('fs.existsAsync', function(){

  it('should return a promise with a single true argument', function(done){
    fs.existsAsync( existingFile )
      .then(function(exists){
        assert.ok(exists);
      })
      .done( done );
  });

  it('should return a promise with a single false argument', function(done){
    fs.existsAsync( nonExistingFile )
      .then(function(exists){
        assert.notOk(exists);
      })
      .done( done );
  });

  it('fs.readFileAsync on an existing file', function(done){
    fs.readFileAsync(existingFile, 'utf8')
      .then(function(data){
        assert.ok(data);
      })
      .done( done );
  })

  it('fs.readFileAsync on an existing file', function(done){
    fs.readFileAsync(nonExistingFile, 'utf8')
      .catch(function(err){
        assert.ok(err);
      })
      .done( done );
  });

  it('fs.readJSONAsync on package.json', function(done){
    var packagePath = path.join(__dirname, '../..', 'package.json');
    fs.readJSONAsync(packagePath)
      .then(function(jsonData){
        assert.ok(jsonData);
        assert.equal(jsonData.name, 'vigour-fs-promised');
      })
      .done( done )
  });

});