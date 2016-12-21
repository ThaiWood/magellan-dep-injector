const mockFs = require("mock-fs");

const normalJSON = `{
  "reporters": [
    "some-reporter-module",
    "testarmada-magellan-admiral-plugin"
  ],
  "nightwatch_config": "./test/automation/conf/nightwatch.json",
  "setup_teardown": "./test/automation/mocks/magellan-init.js"
}`;

const evilJSON = `null`;
const evilJSON2 = `"just a string"`;

const missingReportersJSON = `{
  "nightwatch_config": "./test/automation/conf/nightwatch.json",
  "setup_teardown": "./test/automation/mocks/magellan-init.js"
}`;

module.exports = (configPath) => {
  var mockDirs = {};
  mockDirs[configPath] = {
    "magellan.json": normalJSON,
    "evil.json": evilJSON,
    "evil2.json": evilJSON2,
    "missing_reporters.json": missingReportersJSON,
    "empty-dir": {}
  };
  mockFs(mockDirs);
}