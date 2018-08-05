let Utils = require('./utils');

module.exports = function (key, alias = null) {
  let existingFile = Utils.getYamlRegFileOrMigrate();
  existingFile.keys[key] = null;

  // If an alias is provided added it
  if (alias) {
    existingFile.aliases[alias] = key;
    existingFile.keys[key] = alias;
  }

  Utils.writeToRegFile(existingFile);
  console.log('[notify] Your registration code has been saved to ~/.notifyreg');
};
