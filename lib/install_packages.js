const execSync = require("child_process").execSync;

module.exports = (includedPackages, installGlobally, registry) => {
  if (includedPackages.length > 0) { 
    console.log("Magellan dependency injector installing packages:");
  }

  includedPackages.forEach((package) => {
    const registryArg = "";
    if (registry) {
      registryArg = `--registry ${registry}`;
    }
    const cmd = `npm install ${installGlobally ? "-g" : ""} ${package.name}@${package.rawSpec} ${registryArg}`;
    console.log(`Running ${cmd}`);
    execSync(cmd);
  });
};