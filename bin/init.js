var inquirer = require('inquirer')
var fs = require('fs')
var shell = require('shelljs')
var homedir = require('homedir')
var isThere = require('is-there')

module.exports = function () {
  var configPath = homedir() + '/.memories.js'
  var config = isThere(configPath) ? require(configPath) : {}

  var questions = [
    {
      type: 'input',
      name: 'path',
      message: 'where would you like to store your memories?',
      default: homedir() + '/Documents/memories'
    },
    {
      type: 'input',
      name: 'editor',
      message: 'and what editor would you like to use to log your memories?',
      default: config.editor || 'atom'
    }
  ]

  var onComplete = function (answers) {
    var configData = 'module.exports = {\n' +
    '  "path" : "' + answers.path + '",\n' +
    '  "editor" : "' + answers.editor + '"\n' +
    '}'

    if (!isThere(answers.path)) { shell.exec('mkdir ' + answers.path) }

    fs.writeFile(homedir() + '/.memories.js', configData, function (err) {
      if (err) { throw err }
      console.log('initialization complete! run \'memories add\' to log a new memory')
    })

  }

  inquirer.prompt(questions).then(onComplete)
}
