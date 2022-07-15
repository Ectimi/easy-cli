#!/usr/bin/env node
import chalk from 'chalk'
import figlet from 'figlet'
import { Command } from 'commander';
import { getEslint } from '../eslint'
import {generateTemplate} from '../template'

const packageInfo = require('../../package.json')
const cliName = packageInfo.name
const version = `v${packageInfo.version}`
const program = new Command();

program
  .version(version)
  .usage('<command> [option]')

program
  .description('start eslint and fix code')
  .command('eslint')
  .action((value) => {
    getEslint()
  })

  program
    .description('create a new project')
    .command('create <project-name>')
    .option('-f --force','overwrite target directory if it exist')
    .action((name,options)=>{
      generateTemplate(name,options)
    })

program
// 监听 --help 执行
.on('--help', () => {
  console.log('\r\n' + figlet.textSync(cliName, {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  }));

  console.log(`\r\nRun ${chalk.cyan(`${cliName} <command> --help`)} for detailed usage of given command\r\n`)
})



program.parse(process.argv);