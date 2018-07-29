const utils = require('../node/utils');
const mock = require('mock-fs');
const fs = require('fs');

const USER_HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

let REG_FILE = USER_HOME + '/.notifyreg';

// mock-fs/jest fix (hack)
MISSING_NODE_FILE = './node_modules/jest-util/node_modules/callsites/index.js';
let mockDir = {};
//mockDir[MISSING_NODE_FILE] = fs.readFileSync(MISSING_NODE_FILE);
mockDir[USER_HOME] = {};

beforeEach(() => {
    mock(mockDir);
});

afterEach(() => {
    mock.restore();
});

test('Creates new notifyreg file if it doesn\'t exist' , () => {
    let regFile = utils.getYamlRegFileOrMigrate();
    utils.writeToRegFile(regFile);
    expect(fs.existsSync(REG_FILE)).toBeTruthy();
});

describe('Contructs file system containing old format file', () => {
    beforeEach(() => {
        // Setup
        const OLD_FORMAT = "key_0\nkey_1\n";
        let mockRegFile = {};
        mockRegFile[REG_FILE] = OLD_FORMAT;
        mock(mockRegFile);
    });

    afterEach(() => {
        mock.restore();
    });

    test('Reformats old reg file to new yaml format', () => {
        let regFile = utils.getYamlRegFileOrMigrate();
        expect(regFile).toEqual({'keys': {key_0:null, key_1:null}, 'aliases': {}});
    });
});





