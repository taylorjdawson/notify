let fs = require('fs');

let Utils = require('./utils');

module.exports = function(key) {
  let existingFile = Utils.getYamlRegFileOrMigrate();

  if (existingFile.indexOf(key + '\n') === -1) {
    console.log(
      '[notify] The registration key ' + key + ' was never registered.'
    );
    return;
  }

  let newContents = existingFile.replace(key + '\n', '');
  Utils.writeToRegFile(newContents);
  console.log(
    '[notify] The registration key ' + 
    key + 
    ' has been removed from ~/.notifyreg'
  );
};
