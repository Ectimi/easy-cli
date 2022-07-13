"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/util/file.ts
var file_exports = {};
__export(file_exports, {
  existsFile: () => existsFile,
  loadFile: () => loadFile,
  writeFile: () => writeFile
});
module.exports = __toCommonJS(file_exports);
var import_fs_extra = __toESM(require("fs-extra"));
var import_os = __toESM(require("os"));

// src/util/index.ts
var import_chalk = __toESM(require("chalk"));
var loggerInfo = (str = "") => {
  console.log(import_chalk.default.green(`[INFO]\uFF1A ${str}`));
};
var loggerSuccess = (str = "") => {
  console.log(import_chalk.default.greenBright(`[SUCCESS]\uFF1A ${str}`));
};
var loggerError = (str = "") => {
  console.log(import_chalk.default.redBright(`[ERROR]\uFF1A ${str}`));
};

// src/util/file.ts
var loadFile = (path, system = true) => {
  const rePath = system ? `${import_os.default.homedir()}/${path}` : path;
  try {
    if (!import_fs_extra.default.pathExistsSync(rePath)) {
      return false;
    }
    const data = import_fs_extra.default.readJsonSync(rePath);
    return data;
  } catch (err) {
    loggerError(`Error reading file from disk: ${rePath}`);
  }
};
var existsFile = (path, system = true) => {
  const rePath = system ? `${import_os.default.homedir()}/${path}` : path;
  loggerInfo(rePath);
  return import_fs_extra.default.pathExistsSync(rePath);
};
var writeFile = (path, fileName, file, system = true) => {
  const rePath = system ? `${import_os.default.homedir()}/${path}` : path;
  loggerInfo(rePath);
  try {
    import_fs_extra.default.outputJsonSync(`${rePath}/${fileName}`, file);
    loggerSuccess("Writing file successful!");
  } catch (err) {
    loggerError(`Error writing file from disk: ${err}`);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  existsFile,
  loadFile,
  writeFile
});
//# sourceMappingURL=file.js.map