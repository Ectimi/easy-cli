import ora from 'ora';
import inquirer from 'inquirer';
import {
  rollup,
  InternalModuleFormat,
  OutputOptions,
  InputOptions,
} from 'rollup';
import {
  inputOptions as defaultInputOptions,
  outputOptions as defaultOutputOptions,
} from './rollup.config';
import { loggerTiming, loggerError, getCwdPath } from '../../util';
import { TCommand } from '../../types';

export const buildRollup = async (options: { default: boolean }) => {
  const { inputOptions, outputOptions } = await getOptions(options.default);

  loggerTiming('ROLLUP BUILD');

  const spinner = ora('ROLLUP Building...');

  spinner.start();

  try {
    const bundle = await rollup(inputOptions);
    await bundle.generate(outputOptions);
    await bundle.write(outputOptions);
    spinner.succeed('ROLLUP BUILD SUCCESS!');
  } catch (error) {
    spinner.fail('ROLLUP BUILD FAILED!');
    loggerError(error as string);
  }

  loggerTiming('ROLLUP BUILD', false);
};

async function getOptions(
  isdefault: boolean = false
): Promise<{ inputOptions: InputOptions; outputOptions: OutputOptions }> {
  let inputOptions = { ...defaultInputOptions };
  let outputOptions = { ...defaultOutputOptions };

  if (!isdefault) {
    const formatTypes: Array<{ name: InternalModuleFormat; des: string }> = [
      {
        name: 'cjs',
        des: 'CommonJS, suitable for Node and other bundlers',
      },
      {
        name: 'amd',
        des: 'Asynchronous Module Definition, used with module loaders like RequireJS',
      },
      {
        name: 'es',
        des: 'Keep the bundle as an ES module file, suitable for other bundlers and inclusion as a <script type=module> tag in modern browsers',
      },
      {
        name: 'iife',
        des: ' A self-executing function, suitable for inclusion as a <script> tag',
      },
      {
        name: 'system',
        des: 'Native format of the SystemJS loader',
      },
      {
        name: 'umd',
        des: 'Universal Module Definition, works as amd, cjs and iife all in one',
      },
    ];

    const { input, formatType, dir } = await inquirer.prompt([
      {
        name: 'input',
        type: 'input',
        message: `Please input build entry`,
        default: 'src/index.js',
      },
      {
        name: 'formatType',
        type: 'list',
        message: 'Please select a bundle type',
        default: 0,
        choices: formatTypes.map((item) => ({
          name: `${item.name}  ${item.des}`,
          value: item.name,
        })),
      },
      {
        name: 'dir',
        type: 'input',
        message: `Please input output dir,default value 'cjs'`,
        default: './cjs',
      },
    ]);

    inputOptions.input = getCwdPath(input);
    outputOptions.dir = getCwdPath(dir);
    outputOptions.format = formatType;

    if (formatType === 'iife' || formatType === 'umd') {
      const { outputName } = await inquirer.prompt([
        {
          name: 'outputName',
          type: 'input',
          message: `Please input output name,default 'bundle' `,
          default: 'bundle',
        },
      ]);
      outputOptions.name = outputName;
    }
  }
  return { inputOptions, outputOptions };
}

export const rollupCommand: TCommand = {
  description: 'use rollup build project',
  command: 'rollup',
  options: [
    {
      command: '-d --default',
      description: 'use default config to build',
    },
  ],
  action: buildRollup,
};
