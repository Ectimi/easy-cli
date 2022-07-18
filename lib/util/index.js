"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerUnderline = exports.loggerError = exports.loggerSuccess = exports.loggerWarring = exports.loggerInfo = exports.loggerTiming = exports.getCwdPath = exports.getDirPath = void 0;
var path_1 = require("path");
var chalk_1 = __importDefault(require("chalk"));
// 项目本地路径
var getDirPath = function (relPath) {
    if (relPath === void 0) { relPath = ''; }
    return (0, path_1.resolve)(__dirname, relPath);
};
exports.getDirPath = getDirPath;
// 获取运行路径
var getCwdPath = function (relPath) {
    if (relPath === void 0) { relPath = ''; }
    return (0, path_1.resolve)(process.cwd(), relPath);
};
exports.getCwdPath = getCwdPath;
// 计时日志
var loggerTiming = function (str, start) {
    if (str === void 0) { str = ''; }
    if (start === void 0) { start = true; }
    if (start) {
        console.time('Timing');
        console.log(chalk_1.default.cyan("****** ".concat(str, " START ******")));
    }
    else {
        console.log(chalk_1.default.cyan("****** ".concat(str, " END ******")));
        console.timeEnd('Timing');
    }
};
exports.loggerTiming = loggerTiming;
// 普通日志
var loggerInfo = function (str) {
    if (str === void 0) { str = ''; }
    console.log(chalk_1.default.green("\r\n[INFO]\uFF1A ".concat(str)));
};
exports.loggerInfo = loggerInfo;
// 警告日志
var loggerWarring = function (str) {
    if (str === void 0) { str = ''; }
    console.log(chalk_1.default.yellowBright("\r\n[WARRING]\uFF1A ".concat(str)));
};
exports.loggerWarring = loggerWarring;
// 成功日志
var loggerSuccess = function (str) {
    if (str === void 0) { str = ''; }
    console.log(chalk_1.default.greenBright("\r\n[SUCCESS]\uFF1A ".concat(str)));
};
exports.loggerSuccess = loggerSuccess;
// 报错日志
var loggerError = function (str) {
    if (str === void 0) { str = ''; }
    console.log(chalk_1.default.redBright("\r\n[ERROR]\uFF1A ".concat(str)));
};
exports.loggerError = loggerError;
// 下划线重点输出
var loggerUnderline = function (str) {
    if (str === void 0) { str = ''; }
    return chalk_1.default.blue.underline.bold(str);
};
exports.loggerUnderline = loggerUnderline;
