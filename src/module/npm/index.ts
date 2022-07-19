import { TCommand } from '../../types';

export const Npm = () => {};

export const rollupCommand: TCommand = {
  description: 'get npm version; set or get npm registry',
  command: 'rollup',
  options: [
    {
      command: '-t --taobao',
      description: 'set npm registry to taobao mirror',
    },
  ],
  action: Npm,
};
