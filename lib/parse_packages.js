const npa = require("npm-package-arg");

const parseList = (arg) => {
  return (arg ? arg : "").split(",").reduce((memo, p) => {
    return memo.concat((p.trim().length > 0) ? [p] : []);
  }, []);
};

module.exports = (arg) => parseList(arg).map((item) => npa(item));