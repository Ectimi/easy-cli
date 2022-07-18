#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
var module_1 = __importDefault(require("../module"));
var commander_1 = require("commander");
var packageInfo = require('../../package.json');
var commandName = packageInfo.commandName;
var version = "v".concat(packageInfo.version);
var program = new commander_1.Command();
program.version(version).usage('<command> [option]');
module_1.default.forEach(function (config) {
    var description = config.description, command = config.command, option = config.option, action = config.action;
    var cmd = program
        .description(description)
        .command(command)
        .action(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return action.apply(void 0, args);
    });
    if (option) {
        cmd.option(option.command, option.description);
    }
});
program
    // 监听 --help 执行
    .on('--help', function () {
    console.log('\r\n' +
        figlet_1.default.textSync(commandName, {
            font: 'Ghost',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true,
        }));
    console.log("\r\nRun ".concat(chalk_1.default.cyan("".concat(commandName, " <command> --help")), " for detailed usage of given command\r\n"));
});
program.parse(process.argv);
