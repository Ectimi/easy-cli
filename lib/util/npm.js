"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// package.json
var require_package = __commonJS({
  "package.json"(exports, module2) {
    module2.exports = {
      name: "cli",
      version: "1.0.0",
      description: "",
      main: "index.js",
      bin: {
        "fe-cli": "/lib/bin/index.js"
      },
      scripts: {
        test: 'echo "Error: no test specified" && exit 1',
        build: "tsup"
      },
      keywords: [],
      author: "",
      license: "ISC",
      devDependencies: {
        "@types/eslint": "^8.4.5",
        "@typescript-eslint/eslint-plugin": "^5.30.6",
        "@typescript-eslint/parser": "^5.30.6",
        eslint: "^8.19.0",
        tsup: "^6.1.3"
      },
      dependencies: {
        "@types/fs-extra": "^9.0.13",
        "@types/shelljs": "^0.8.11",
        chalk: "^5.0.1",
        commander: "^9.3.0",
        "download-git-repo": "^3.0.2",
        "fs-extra": "^10.1.0",
        inquirer: "^9.0.0",
        "latest-version": "^7.0.0",
        ora: "^6.1.2",
        shelljs: "^0.8.5"
      }
    };
  }
});

// src/util/npm.ts
var npm_exports = {};
__export(npm_exports, {
  checkVersion: () => checkVersion,
  existNpm: () => existNpm,
  npmInstall: () => npmInstall
});
module.exports = __toCommonJS(npm_exports);

// src/util/index.ts
var import_chalk = __toESM(require("chalk"));
var loggerInfo = (str = "") => {
  console.log(import_chalk.default.green(`[INFO]\uFF1A ${str}`));
};
var loggerWarring = (str = "") => {
  console.log(import_chalk.default.yellowBright(`[WARRING]\uFF1A ${str}`));
};
var loggerError = (str = "") => {
  console.log(import_chalk.default.redBright(`[ERROR]\uFF1A ${str}`));
};

// src/util/npm.ts
var import_latest_version = __toESM(require("latest-version"));
var import_shelljs = __toESM(require("shelljs"));
var packageInfo = require_package();
var parseVersion = (ver) => {
  return Number(ver.split(".").toString());
};
var checkVersion = async () => {
  const latestVer = await (0, import_latest_version.default)("@boty-design/fe-cli");
  if (parseVersion(latestVer) > parseVersion(packageInfo.version)) {
    loggerWarring(`The current version is the :  ${latestVer}`);
  } else {
    loggerInfo("The current version is the latest:");
  }
};
var existNpm = async (packageName) => {
  try {
    const latestVer = await (0, import_latest_version.default)(packageName);
    return latestVer;
  } catch (error) {
    loggerError(error);
    process.exit(1);
  }
};
var npmInstall = async (packageName) => {
  try {
    import_shelljs.default.exec(`yarn add ${packageName}`, { cwd: process.cwd() });
  } catch (error) {
    loggerError(error);
    process.exit(1);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkVersion,
  existNpm,
  npmInstall
});
//# sourceMappingURL=npm.js.map