const mock = require('mock-fs');
const register = require('../node/register');
const fs = require('fs');
const utils = require('../node/utils');

const USER_HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

// mock-fs/jest fix (hack)
MISSING_NODE_FILE = './node_modules/jest-util/node_modules/callsites/index.js';
let mockDir = {};
mockDir[MISSING_NODE_FILE] = fs.readFileSync(MISSING_NODE_FILE);
mockDir[USER_HOME] = {};

beforeEach(() => {
    mock(mockDir);
});

afterEach(() => {
    mock.restore();
});

test('Successfully registers a key' , () => {
    const KEY = 'a_key';
    register(KEY);
    let regFile = utils.getYamlRegFileOrMigrate();
    expect(KEY in regFile.keys).toBeTruthy();
});

test('Successfully registers an alias' , () => {
    const KEY = 'a_key';
    const ALIAS = 'an_alias';

    register(KEY, ALIAS);
    let regFile = utils.getYamlRegFileOrMigrate();
    expect(KEY in regFile.keys).toBeTruthy();
    expect(ALIAS in regFile.aliases).toBeTruthy();
});


