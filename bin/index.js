#!/usr/bin/env node

var cmd = process.argv[2]
var init = require('./init.js')
var help = require('./help.js')

switch (cmd) {
  case 'init': init(); break
  default: help()
}
