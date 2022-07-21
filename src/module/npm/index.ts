import shell from 'shelljs';
import { loggerError, loggerSuccess } from '../../util';
import { TCommand } from '../../types';

const Npm = (options: {
  check: boolean;
  list: boolean;
  taobao: boolean;
  reset: boolean;
  url: string;
}) => {
  const { check, list, taobao, url, reset } = options;
  try {
    if (check) {
      shell.exec('npm config get registry');
    } else if (list) {
      shell.exec('npm list -g --depth 0');
    } else if (reset) {
      shell.exec('npm config set registry https://registry.npmjs.org/');
      loggerSuccess('已npm源已重置');
    } else if (taobao) {
      shell.exec('npm config set registry https://registry.npm.taobao.org');
      loggerSuccess('已将npm源设为淘宝镜像');
    } else if (url) {
      shell.exec(`npm config set registry ${url}`);
      loggerSuccess('npm源设置成功');
    }
    shell.exit(0);
  } catch (error) {
    loggerError(error as string);
    shell.exit(1);
  }
};

export const npmCommand: TCommand = {
  description: 'get npm version; set or get npm registry',
  command: 'npm',
  options: [
    {
      command: '-c --check',
      description: 'check npm registry',
    },
    {
      command: '-l --list',
      description: 'check global installed package',
    },
    {
      command: '-t --taobao',
      description: 'set npm registry to taobao mirror',
    },
    {
      command: '-r --reset',
      description: 'reset npm registry',
    },
    {
      command: '-u --url <registry-url>',
      description: 'set npm registry',
    },
  ],
  action: Npm,
};
