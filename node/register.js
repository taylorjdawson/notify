let fs = require('fs');

let Utils = require('./utils');

module.exports = function(key) {
  let existingFile = Utils.getRegFile();
  Utils.writeToRegFile(existingFile + key + '\n');
  console.log('[notify] Your registration code has been saved to ~/.notifyreg.yml');
};
