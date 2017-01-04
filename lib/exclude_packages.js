module.exports = (reporters, excludedPackages) => {
  var removedPackages = false;

  console.log(`Exclusion list:  ${excludedPackages.map((pkg) => pkg.name).join(", ")}`);
  console.log(`Existing reporter list:  ${reporters.join(", ")} )`);

  const result = reporters.filter((p) => {
    if (excludedPackages.find((pkg) => pkg.name === p)) {
      removedPackages = true;
      console.log(`Removing ${p} from reporter list`);
      return false;
    }
    return true;
  });

  if (removedPackages) {
    console.log(`Resulting reporter list:  ${result.join(", ")} )`);
  } else {
    console.log("No reporters were removed. Resulting reporter list is unchanged");
  }

  return result;
};