// In the spirit of DRY just returns the Users home director
const fs = require('fs');

module.exports = {
  getMockDir: function () {
    const USER_HOME =
      process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
    // mock-fs/jest fix (hack)
    MISSING_NODE_FILE = './node_modules/callsites/index.js';
    let mockDir = {};
    mockDir[MISSING_NODE_FILE] = fs.readFileSync(MISSING_NODE_FILE);
    mockDir[USER_HOME] = {};
    return mockDir;
  }
};