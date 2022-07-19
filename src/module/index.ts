import { eslintCommad } from './eslint';
import { createCommad } from './template';
import { deployCommand } from './deploy';
import { rollupCommand } from './rollup';

export default [eslintCommad, createCommad, deployCommand, rollupCommand];
