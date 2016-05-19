var homedir = require('homedir')
var shell = require('shelljs')
var fs = require('fs')
var template = require('./template.js')
var moment = require('moment')
var isThere = require('is-there')
var includes = require('lodash.includes')

module.exports = function () {
  var config = require(homedir() + '/.memories.js')
  var day = moment().format('YYYY-MM-DD')
  var time = moment().format('hh:mm:ss A')
  var fileName = day + '.md'
  var filePath = config.path + '/' + fileName

  if (isThere(filePath)) {
    fs.appendFileSync(filePath, '\n\n### ' + time)
  } else {
    fs.writeFileSync(filePath, template(day, time))
  }

  if (includes(['vim', 'vi', 'emacs', 'nano'], config.editor)) {
    require('child_process').spawn(config.editor, [filePath], {stdio: 'inherit'})
  } else {
    shell.exec('open -a ' + config.editor + ' ' + filePath)
  }
}
