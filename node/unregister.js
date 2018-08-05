let fs = require('fs');
let Utils = require('./utils');

module.exports = function (key) {
  let regFile = Utils.getYamlRegFileOrMigrate();

  // Check if the key exists
  if (key in regFile.keys || key in regFile.aliases) {

    let alias = key in regFile.aliases ? key : regFile.keys[key];

    // Checks to see if the key is an alias or if the key has an alias
    if (alias) {
      delete regFile.keys[regFile.aliases[alias]];
      delete regFile.aliases[alias];
    } else {
      delete regFile.keys[key];
    }

    Utils.writeToRegFile(regFile);

    console.log(
      '[notify] The registration key ' +
      key +
      ' has been removed from ~/.notifyreg'
    );

  } else {
    console.log(
      '[notify] The registration key ' + key + ' was never registered.'
    );
  }
};