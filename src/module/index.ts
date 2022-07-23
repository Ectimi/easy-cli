import { createCommad } from "./template";
import { compressImageCommand } from "./compressImage";
import { deployCommand } from "./deploy";
import { eslintCommad } from "./eslint";
import { minifyCommad } from "./minify";
import { npmCommand } from "./npm";
import { rollupCommand } from "./rollup";

import { xlsxCommads } from "./xlsx";

export default [
  createCommad,
  compressImageCommand,
  deployCommand,
  eslintCommad,
  minifyCommad,
  npmCommand,
  rollupCommand,
  ...xlsxCommads,
];
