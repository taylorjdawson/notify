const mock = require('mock-fs');
const register = require('../node/register');
const fs = require('fs');
const utils = require('../node/utils');

const USER_HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
let REG_FILE = USER_HOME + '/.notifyreg';
let mockUserHomeDir = {};
mockUserHomeDir[USER_HOME] = {};

beforeEach(() => {
    mock(mockUserHomeDir);
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

