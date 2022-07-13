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

// src/util/index.ts
var util_exports = {};
__export(util_exports, {
  getCwdPath: () => getCwdPath,
  getDirPath: () => getDirPath,
  loggerError: () => loggerError,
  loggerInfo: () => loggerInfo,
  loggerSuccess: () => loggerSuccess,
  loggerTiming: () => loggerTiming,
  loggerWarring: () => loggerWarring
});
module.exports = __toCommonJS(util_exports);
var import_path = require("path");
var import_chalk = __toESM(require("chalk"));
var getDirPath = (relPath = "") => {
  return (0, import_path.resolve)(__dirname, relPath);
};
var getCwdPath = (relPath = "") => {
  return (0, import_path.resolve)(process.cwd(), relPath);
};
var loggerTiming = (str = "", start = true) => {
  if (start) {
    console.time("Timing");
    console.log(import_chalk.default.cyan(`****** ${str} START ******`));
  } else {
    console.log(import_chalk.default.cyan(`****** ${str} END ******`));
    console.timeEnd("Timing");
  }
};
var loggerInfo = (str = "") => {
  console.log(import_chalk.default.green(`[INFO]\uFF1A ${str}`));
};
var loggerWarring = (str = "") => {
  console.log(import_chalk.default.yellowBright(`[WARRING]\uFF1A ${str}`));
};
var loggerSuccess = (str = "") => {
  console.log(import_chalk.default.greenBright(`[SUCCESS]\uFF1A ${str}`));
};
var loggerError = (str = "") => {
  console.log(import_chalk.default.redBright(`[ERROR]\uFF1A ${str}`));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCwdPath,
  getDirPath,
  loggerError,
  loggerInfo,
  loggerSuccess,
  loggerTiming,
  loggerWarring
});
//# sourceMappingURL=index.js.map