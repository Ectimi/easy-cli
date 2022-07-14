#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
var commander_1 = require("commander");
var eslint_1 = require("../eslint");
var template_1 = require("../template");
var packageInfo = require('../../package.json');
var cliName = packageInfo.name;
var version = "v".concat(packageInfo.version);
var program = new commander_1.Command();
program
    .version(version)
    .usage('<command> [option]');
program
    .description('start eslint and fix code')
    .command('eslint')
    .action(function (value) {
    (0, eslint_1.getEslint)();
});
program
    .description('create a new project')
    .command('create <project-name>')
    .option('-f --force', 'overwrite target directory if it exist')
    .action(function (name, options) {
    (0, template_1.generateTemplate)(name, options);
});
// bin/cli.js
program
    // 监听 --help 执行
    .on('--help', function () {
    console.log('\r\n' + figlet_1.default.textSync(cliName, {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }));
    console.log("\r\nRun ".concat(chalk_1.default.cyan("".concat(cliName, " <command> --help")), " for detailed usage of given command\r\n"));
});
program.parse(process.argv);
