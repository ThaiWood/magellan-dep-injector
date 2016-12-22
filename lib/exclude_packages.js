module.exports = (reporters, excludedPackages) => {
  return reporters.filter((p) => {
    if (excludedPackages.find((pkg) => pkg.name === p)) {
      console.log(`Removing ${p} from reporter list`);
      return false;
    }
    return true;
  });
};