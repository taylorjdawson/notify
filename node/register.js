let Utils = require('./utils');

module.exports = function (key, alias = null) {
  let regFile = Utils.getYamlRegFileOrMigrate();
  regFile.keys[key] = null;

  // If an alias is provided added it
  if (alias) {
    regFile.aliases[alias] = key;
    regFile.keys[key] = alias;
  }

  Utils.writeToRegFile(regFile);
  console.log('[notify] Your registration code has been saved to ~/.notifyreg');
};
