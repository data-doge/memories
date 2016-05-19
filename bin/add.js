var homedir = require('homedir')
var shell = require('shelljs')
var fs = require('fs')
var template = require('./template.js')
var moment = require('moment')
var isThere = require('is-there')

module.exports = function () {
  var config = require(homedir() + '/.memories.js')
  var memoriesPath = config.path
  var editor = config.editor
  var day = moment().format('YYYY-MM-DD')
  var time = moment().format('hh:mm:ss A')
  var fileName = day + '.md'
  var filePath = memoriesPath + '/' + fileName

  if (isThere(filePath)) {
    fs.appendFileSync(filePath, '\n\n### ' + time)
  } else {
    fs.writeFileSync(filePath, template(day, time))
  }

  shell.exec('open -a ' + editor + ' ' + filePath)
}
