# Magellan Dependency Injector

`magellan-dep-injector` is a command line tool for injecting dependencies into your `magellan.json` configuration 
(and node project) very late in your build process, i.e. immediately before running `magellan`. This is a useful
pattern if you have the need to inject monitoring or reporting tools into projects passing through a larger-scale
CI infrastructure, especially if you do not use containers or have a variety of containers and don't wish to pollute
projects or images with CI-only module references.

## Usage

```shell
magellan-dep-injector --include=modulename@1.2.3,modulename2@2.0.0 --exclude=old-module-name --config_path=./tests/functional
```

# License

All code not otherwise specified is Copyright Wal-Mart Stores, Inc. Released under the [MIT](./LICENSE) License.
