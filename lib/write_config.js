const fs = require("fs");

module.exports = (config, configPath) => {
  const configString = JSON.stringify(config, null, 2);
  console.log(`Writing config string to ${configPath} ...`);
  fs.writeFileSync(configPath, configString);
}
