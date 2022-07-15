import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import util from 'util';
import tmp from 'tmp';
import downloadGitRepo from 'download-git-repo';

const downloadGit: any = util.promisify(downloadGitRepo);

async function wrapLoading(
  fn: (...arg: any) => void,
  message: string,
  ...args: any[]
) {
  const spinner = ora(message);
  spinner.start();

  try {
    const result = await fn(...args);
    spinner.succeed();
    return result;
  } catch (error) {
    spinner.fail('Request failed, pleact check the network ...');
  }
}

export const generateTemplate = async (
  name: string,
  options: { force: boolean }
) => {
  const cwd = process.cwd();
  const targetDir = path.join(cwd, name);
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir);
    } else {
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists,pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite',
            },
            {
              name: 'Cancel',
              value: false,
            },
          ],
        },
      ]);

      if (!action) return;
      else if (action === 'overwrite') {
        console.log('\r\nRemoving...');
        await fs.remove(targetDir);
      }
    }
  }
  fs.mkdirSync(targetDir);

  async function create(targetDir: string) {
    const tmpobj = tmp.dirSync();
    const requestUrl = `Ectimi/project-template`;

    try {
      await wrapLoading(
        downloadGit, // 远程下载方法
        'loading template , please wait...', // 加载提示信息
        requestUrl, // 参数1: 下载地址
        path.resolve(tmpobj.name)
      ); // 参数2: 创建位置
      const types = await fs.readdir(tmpobj.name);
      const { type } = await inquirer.prompt([
        {
          name: 'type',
          type: 'list',
          message: 'Please select template type:',
          choices: types.map((name) => ({
            name,
            value: name,
          })),
        },
      ]);

      if (!type) return;
      else {
        const templates = await fs.readdir(path.resolve(tmpobj.name, type));
        console.log('templates=>', templates);
        const { templateName } = await inquirer.prompt([
          {
            name: 'templateName',
            type: 'list',
            message: 'Please select a template:',
            choices: templates.map((name) => ({
              name,
              value: name,
            })),
          },
        ]);

        if (!templateName) return;
        else {
          await fs.copy(
            path.resolve(tmpobj.name, type, templateName),
            targetDir
          );
        }
      }
      await fs.emptyDir(tmpobj.name);
      tmpobj.removeCallback();
      console.log(`\r\nSuccessfully created project ${chalk.cyan(name)}`);
      console.log(`\r\n  cd ${chalk.cyan(name)}`);
    } catch (error) {
      console.log('create failed');
      console.log('error =>', chalk.red(error));
    }
  }

  create(targetDir);
};
