/* global describe, it, assert */

var fs = require('../..')
var path = require('path')
var existingFile = path.join(__dirname, 'async.js')
var nonExistingFile = path.join(__dirname, 'non-existing-file.js')
var packagePath = path.join(__dirname, '../..', 'package.json')

describe('vigour-fs-promised', function () {

  it('exists should `cb(true)`'
  , function (done) {
    fs.exists(existingFile, function (exists) {
      assert.equal(exists, true)
      done()
    })
  })

  it('exists should `cb(null, true)`'
  , function (done) {
    fs.exists(existingFile, function (err, exists) {
      assert.equal(err, null)
      assert.equal(exists, true)
      done()
    })
  })

  it('existsAsync should return a promise for `true`'
  , function () {
    return fs.existsAsync(existingFile)
      .then(function (exists) {
        assert.ok(exists)
      })
  })

  it('existsAsync should return a promise for `false`'
  , function () {
    return fs.existsAsync(nonExistingFile)
      .then(function (exists) {
        assert.notOk(exists)
      })
  })

  it('readFileAsync should return a promise for the contents of the file'
  , function () {
    return fs.readFileAsync(existingFile, 'utf8')
      .then(function (data) {
        assert.ok(data)
      })
  })

  it('readFileAsync should return a promise and reject it'
  , function () {
    return fs.readFileAsync(nonExistingFile, 'utf8')
      .catch(function (err) {
        assert.ok(err)
      })
  })

  it('readJSON should `cb(null, JSON.parse(package.json))`'
  , function () {
    return fs.readJSON(packagePath, function (err, obj) {
      assert.equal(err, null)
      assert.ok(obj)
      assert.equal(obj.name, 'vigour-fs-promised')
    })
  })

  it('readJSONAsync should return a promise for the parsed package'
  , function () {
    return fs.readJSONAsync(packagePath)
      .then(function (jsonData) {
        assert.ok(jsonData)
        assert.equal(jsonData.name, 'vigour-fs-promised')
      })
  })

})
