var inquirer = require('inquirer')
var fs = require('fs')
var shell = require('shelljs')
var homedir = require('homedir')

module.exports = function () {
  var questions = [
    {
      type: 'input',
      name: 'memoriesPath',
      message: 'where would you like to store your memories?',
      default: homedir() + '/Documents/memories'
    },
    {
      type: 'input',
      name: 'memoriesEditor',
      message: 'and what editor would you like to use to log your memories',
      default: 'atom'
    }
  ]

  var onComplete = function (answers) {
    var initData = 'module.exports = {\n' +
    '  "memoriesPath" : "' + answers.memoriesPath + '",\n' +
    '  "memoriesEditor" : "' + answers.memoriesEditor + '"\n' +
    '}'

    fs.writeFile(homedir() + '/.memories.json', initData, function (err) {
      if (err) { throw err }
      console.log('initialization complete! run \'memories add\' to log a new memory')
    })
  }

  inquirer.prompt(questions).then(onComplete)
}
