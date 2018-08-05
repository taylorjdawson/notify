const utils = require('../node/utils');
const mock = require('mock-fs');
const fs = require('fs');
const testSetup = require('./test-setup');

const USER_HOME = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
const MOCK_DIR = testSetup.getMockDir();
let REG_FILE = USER_HOME + '/.notifyreg';


beforeEach(() => {
  mock(MOCK_DIR);
});

afterEach(() => {
  mock.restore();
});

test('Creates new notifyreg file if it doesn\'t exist', () => {
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
    expect(regFile).toEqual({'keys': {key_0: null, key_1: null}, 'aliases': {}});
  });
});





