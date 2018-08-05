let fs = require('fs'); // TODO: Might need to be const
const yaml = require('js-yaml');

const yamlSchema = {'keys': {}, 'aliases': {}};

let getUserHome = function() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
};

let getRegFilename = function() {
  return getUserHome() + '/.notifyreg';
};

let isYaml = function(regFile) {
  return typeof regFile === 'object';
};

let convertToYaml = function(regFile) {
    let newRegFile = yamlSchema;
    let keys = regFile.split(" ");

    if(keys.length){
      for (let key of keys) {
        newRegFile.keys[key] = null;
      }
    }

  return newRegFile;
};

module.exports = {

  // Returns JSON object
  getYamlRegFileOrMigrate: function() {
    let regFilename = getRegFilename();

    // Empty template overwritten if regFile exists
    let regFile = yamlSchema;

    if (fs.existsSync(regFilename)) {

        regFile = yaml.safeLoad(
          fs.readFileSync(regFilename, {encoding: 'utf8'}));

        regFile = isYaml(regFile) ? regFile : convertToYaml(regFile);
    }
	
	// Create the regFile schema since it doesn't exist
    return regFile;
  },

  writeToRegFile: function(data) {
  	fs.writeFileSync(getRegFilename(), yaml.safeDump(data), 'utf-8');
  },
};

