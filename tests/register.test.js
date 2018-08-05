const mock = require('mock-fs');
const register = require('../node/register');
const utils = require('../node/utils');
const testSetup = require('./test-setup');

const MOCK_DIR = testSetup.getMockDir();

beforeEach(() => {
  mock(MOCK_DIR);
});

afterEach(() => {
  mock.restore();
});

test('Successfully registers a key', () => {
  const KEY = 'a_key';
  register(KEY);
  let regFile = utils.getYamlRegFileOrMigrate();
  expect(KEY in regFile.keys).toBeTruthy();
});

test('Successfully registers an alias', () => {
  const KEY = 'a_key';
  const ALIAS = 'an_alias';

  register(KEY, ALIAS);
  let regFile = utils.getYamlRegFileOrMigrate();
  expect(KEY in regFile.keys).toBeTruthy();
  expect(ALIAS in regFile.aliases).toBeTruthy();
});


