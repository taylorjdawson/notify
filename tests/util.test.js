const utils = require('../node/utils');
const mock = require('mock-fs');
const fs = require('fs');

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





/*
mock(mockUserHomeDir);

let regFile = utils.getYamlRegFileOrMigrate();

// utils.writeToRegFile(regFile);
console.log(`Before Rest: ${fs.existsSync(REG_FILE)}`);
mock.restore();

console.log(`After Rest: ${fs.readFileSync('/home/injerto/.notifyreg', {encoding: 'utf8'})}`);
*/
