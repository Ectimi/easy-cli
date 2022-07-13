#!/usr/bin/env node // 这个必须添加，指定 node 运行环境
import { Command } from 'commander';
import { getEslint } from '../eslint'

const program = new Command();

program
  .version('0.1.0')
  .description('start eslint and fix code')
  .command('eslint')
  .action((value) => {
    getEslint()
  })
program.parse(process.argv);
