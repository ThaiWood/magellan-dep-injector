const path = require("path");
const fs = require("fs");

const parsePackages = require("../lib/parse_packages");
const excludePackages = require("../lib/exclude_packages");
const includePackages = require("../lib/include_packages");
const writeConfig = require("../lib/write_config");
const errors = require("../lib/errors");
const defaults = require("../lib/defaults");

module.exports = (argv, mockOptions) => {
  // Overlay mocks for operations that can't be mocked easily with mock-fs (i.e. npm install)
  const installPackages = mockOptions.installPackages || require("../lib/install_packages");

  const configPath = path.resolve(argv.config_path || defaults.DEFAULT_CONFIG_PATH);
  const configFilename = `${configPath}/magellan.json`;
  const installGlobally = argv.global;

  const includedPackages = parsePackages(argv.include); 
  const excludedPackages = parsePackages(argv.exclude);

  installPackages(includedPackages, installGlobally, process.env.PRIVATE_NPM_REGISTRY);

  // Missing-config-tolerant bootstrap:
  //
  // 1. Try to load magellan.json. If it exists but is malformed, exit with an error.
  // 2. Create magellan.json at the expected location if it doesn't exist.
  // 3. Create a reporters list if magellan.json exists but doesn't have a reporters list yet.

  try {
    // NOTE: We're not using require() here because we need to be able to use mock-fs
    var config = JSON.parse(fs.readFileSync(configFilename).toString());
  } catch (e) {
    if (e.code === "ENOENT") {
      console.log(`The file ${configFilename} was not found. This is OK. Injector will create a fresh instance of this file.`);
      config = { reporters: []};
    } else {
      const err = new Error(`Error while loading ${configFilename}. Error code: ${e.code}. The file may be malformed or unparseable as JSON.`);
      err.code = errors.CONFIG_MALFORMED;
      throw err;
    }
  }

  if (!config) {
    config = {reporters: []};
  } else if (!config.reporters) {
    config.reporters = [];
  }

  config.reporters = excludePackages(config.reporters, excludedPackages);
  config.reporters = includePackages(config.reporters, includedPackages);

  writeConfig(config, configFilename);
}