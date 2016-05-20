#!/usr/bin/env node

var cmd = process.argv[2]
var config = require('./config.js')
var add = require('./add.js')
var help = require('./help.js')

switch (cmd) {
  case 'config': config(); break
  case 'add': add(); break
  default: help()
}
