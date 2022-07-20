import { eslintCommad } from './eslint';
import { createCommad } from './template';
import { deployCommand } from './deploy';
import { rollupCommand } from './rollup';
import { npmCommand } from './npm';

export default [
  eslintCommad,
  createCommad,
  deployCommand,
  rollupCommand,
  npmCommand,
];
