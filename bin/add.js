var homedir = require('homedir')
var shell = require('shelljs')
var fs = require('fs')
var template = require('./template.js')
var moment = require('moment')

module.exports = function () {
  var config = require(homedir() + '/.memories.js')
  var memoriesPath = config.path
  var editor = config.editor
  var day = moment().format('YYYY-MM-DD')
  var time = moment().format('hh:mm A')

  var fileName = day + '.md'
  var filePath = memoriesPath + '/' + fileName

  fs.writeFile(filePath, template(day, time), function (err) {
    if (err) { throw err }
    shell.exec('open -a ' + editor + ' ' + filePath)
  })
}
