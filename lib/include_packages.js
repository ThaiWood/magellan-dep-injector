module.exports = (reporters, includedPackages) => {
  result = reporters.map((p) => p);

  includedPackages.forEach((package) => {
    if (reporters.indexOf(package.name) === -1) {
      console.log(`Adding ${package.name} to reporter list`);
      result.push(package.name);
    } else {
      console.log(`Skipping ${package.name} (already included in reporter list)`);
    }
  });

  return result;
};