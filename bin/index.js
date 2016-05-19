#!/usr/bin/env node

var cmd = process.argv[2]
var init = require('./init.js')
var add = require('./add.js')
var help = require('./help.js')

switch (cmd) {
  case 'init': init(); break
  case 'add' : add(); break
  default: help()
}
