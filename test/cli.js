const expect = require("chai").expect;
const cli = require("../lib/cli");
const defaults = require("../lib/defaults");
const fs = require("fs");

const mockOptions = {
  installPackages: () => {
    console.log("hello from mock package installer");
  }
};

require("./test_support/load_mocks")(defaults.DEFAULT_CONFIG_PATH);

describe("cli", () => {

  describe("inclusion/exclusion", () => {

    it("should include specified modules", () => {
      const argv = {
        _: [],
        include: 'ci-only-plugin@2.0.0,testarmada-magellan-admiral-plugin@3.0.0'
      };

      cli(argv, mockOptions);

      const result = JSON.parse(fs.readFileSync(`${defaults.DEFAULT_CONFIG_PATH}/magellan.json`).toString());
      expect(result.reporters.length).to.equal(3);
    });

    it("should exclude specified modules", () => {
      const argv = {
        _: [],
        include: 'ci-only-plugin@2.0.0',
        exclude: 'some-reporter-module'
      };

      cli(argv, mockOptions);

      const result = JSON.parse(fs.readFileSync(`${defaults.DEFAULT_CONFIG_PATH}/magellan.json`).toString());
      expect(result.reporters.length).to.equal(2);
    });

  });

});