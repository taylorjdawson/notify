var fs = require('fs');
const yaml = require('js-yaml');

var getUserHome = function() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};

var getRegFilename = function() {
  return getUserHome() + '/.notifyreg.yml';
};

module.exports = {

  // Returns JSON object
  getRegFile: function() {
    if (fs.existsSync(getRegFilename())) {
      return yaml.safeLoad(fs.readFileSync(getRegFilename(), {encoding: 'utf8'}));
    }
	
	// Create the regFile schema since it doesn't exist
    return {'keys': {}, 'aliases': {}};
  },

  writeToRegFile: function(data) {
  	fs.writeFileSync(getRegFilename(), yaml.safeDump(data), 'utf-8');
  },
};

