let fs = require('fs');

let Utils = require('./utils');

module.exports = function(key, alias=null) {
  let existingFile = Utils.getRegFile();
  existingFile.keys[key] = null;

  if(alias) {
    existingFile.aliases[alias] = key;
  }

  // If there is an alias added it


  Utils.writeToRegFile(existingFile + key + '\n');
  console.log('[notify] Your registration code has been saved to ~/.notifyreg.yml');
};
