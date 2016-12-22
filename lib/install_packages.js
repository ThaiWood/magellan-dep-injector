const execSync = require("child_process").execSync;
const MAX_ATTEMPTS = 3;

module.exports = (includedPackages, installGlobally, registry) => {
  if (includedPackages.length > 0) { 
    console.log("Magellan dependency injector installing packages:");
  }

  includedPackages.forEach((package) => {
    const registryArg = "";
    if (registry) {
      registryArg = `--registry ${registry}`;
    }

    const fullPackageName = `${package.name}@${package.rawSpec}`;
    const cmd = `npm install ${installGlobally ? "-g" : ""} ${fullPackageName} ${registryArg}`;
    console.log(`Running ${cmd}`);
    var installed = false;
    var attempts = 0;

    while (!installed && attempts < MAX_ATTEMPTS) {
      try {
        execSync(cmd);
        installed = true;
      } catch (e) {
        attempts = attempts + 1;
        if (attempts >= MAX_ATTEMPTS) {
          console.log("----------------------------------------------------------------------------------------------------");
          console.log(`Have attempted to install package ${fullPackageName} from ${registry ? registry : "default registry"} ${attempts} times. Giving up.`);
          console.log("----------------------------------------------------------------------------------------------------");
          throw e;
        }
      }
    }

  });
};