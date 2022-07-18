import { ESLint } from 'eslint';
import { getCwdPath, loggerTiming, loggerError, getDirPath } from '../../util';
import ora from 'ora';
import { TCommand } from '../../types';

const eslint = new ESLint({
  fix: true,
  extensions: ['.js', '.ts'],
  useEslintrc: false,
  overrideConfig: {
    env: {
      browser: true,
      es2021: true,
    },
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      quotes: ['error', 'double'],
    },
    plugins: ['@typescript-eslint'],
  },
  resolvePluginsRelativeTo: getDirPath('node_modules'),
});

export const getEslint = async (path: string = 'src') => {
  const spinner = ora('checking...');

  try {
    loggerTiming('ESLINT CHECK');

    spinner.start();

    // 2. Lint files.
    const results = await eslint.lintFiles([getCwdPath(path)]);

    // 3. Modify the files with the fixed code.
    await ESLint.outputFixes(results);

    // 4. Format the results.
    const formatter = await eslint.loadFormatter('stylish');

    const resultText = formatter.format(results);

    // 5. Output it.
    if (resultText) {
      loggerError(`'PLEASE CHECK ===》', ${resultText}`);
    } else {
      spinner.succeed('Eslint CHECK SUCCESS!');
      // loggerSuccess('Eslint check completed!');
    }
  } catch (error) {
    spinner.fail('ESLINT CHECK FAILED!');
    loggerError(error as string);
    process.exit(1);
  } finally {
    loggerTiming('ESLINT CHECK', false);
  }
};

export const eslintCommad: TCommand = {
  description: 'start eslint and fix code',
  command: 'eslint',
  action: getEslint,
};
