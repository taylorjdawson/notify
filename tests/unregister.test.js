const mock = require('mock-fs');
const unregister = require('../node/unregister');
const register = require('../node/register');
const fs = require('fs');
const utils = require('../node/utils');
const testSetup = require('./test-setup');

const MOCK_DIR = testSetup.getMockDir();

beforeEach(() => {
  mock(MOCK_DIR);
});

afterEach(() => {
  mock.restore();
});

test('Successfully unregisters a key without an alias', () => {
  const KEY = 'a_key';
  register(KEY);
  unregister(KEY);
  let regFile = utils.getYamlRegFileOrMigrate();
  expect(KEY in regFile.keys).toBeFalsy();
});

test('Successfully unregisters a key that has an alias', () => {
  const KEY = 'a_key';
  const ALIAS = 'an_alias';

  register(KEY, ALIAS);
  unregister(KEY);
  let regFile = utils.getYamlRegFileOrMigrate();
  expect(KEY in regFile.keys).toBeFalsy();
  expect(ALIAS in regFile.aliases).toBeFalsy();
});

test('Successfully unregisters an alias', () => {
  const KEY = 'a_key';
  const ALIAS = 'an_alias';

  register(KEY, ALIAS);
  unregister(ALIAS);
  let regFile = utils.getYamlRegFileOrMigrate();
  expect(KEY in regFile.keys).toBeFalsy();
  expect(ALIAS in regFile.aliases).toBeFalsy();
});