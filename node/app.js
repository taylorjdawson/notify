#!/usr/bin/env node

let program = require('commander');

let packageJson = require('./package.json');
let register = require('./register');
let unregister = require('./unregister');
let notify = require('./notify');

program.version(packageJson.version)
  .option('-r, --register [key]', 'Register')
  .option('-u, --unregister [key]', 'Unregister')
  .option('-t --text [text]', 'Text for the notification')
  .option('-i --title [title]', 'Title for the notification')
  .parse(process.argv);

// For registration
if (program.register) {
  register(program.register);
  return;
}

if (program.unregister) {
  unregister(program.unregister);
  return;
}

notify(program.text, program.title);
