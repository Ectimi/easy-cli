#!/usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';
import allCommand from '../module';
import { Command } from 'commander';

const packageInfo = require('../../package.json');
const commandName = packageInfo.commandName;
const version = `v${packageInfo.version}`;
const program = new Command();

program.version(version).usage('<command> [option]');

allCommand.forEach((config) => {
  const { description, command, option, action } = config;
  const cmd = program
    .description(description)
    .command(command)
    .action((...args) => action(...args));

  if (option) {
    cmd.option(option.command, option.description);
  }
});

program
  // 监听 --help 执行
  .on('--help', () => {
    console.log(
      '\r\n' +
        figlet.textSync(commandName, {
          font: 'Ghost',
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width: 80,
          whitespaceBreak: true,
        })
    );

    console.log(
      `\r\nRun ${chalk.cyan(
        `${commandName} <command> --help`
      )} for detailed usage of given command\r\n`
    );
  });

program.parse(process.argv);
