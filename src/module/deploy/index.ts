import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import ora from 'ora';
import jsonfile from 'jsonfile';
import shell from 'shelljs';
import { NodeSSH } from 'node-ssh';
import archiver from 'archiver';
import { TCommand, TEnvItem, TEnvConfig } from '../../types';
import {
  loggerInfo,
  loggerSuccess,
  loggerError,
  loggerUnderline,
} from '../../util';

const projectDir = process.cwd();
const ssh = new NodeSSH();

const deploy = async () => {
  try {
    const { projectName, config } = await getConfig();

    execBuild(config.script);
    await startZip(config.distPath);
    await connectSSH(config);
    await uploadFile(config.webDir);
    await unzipFile(config.webDir);
    await deleteLocalZip();
    loggerSuccess(`${loggerUnderline(projectName)}项目部署成功^_^\n`);
    shell.exit(0);
  } catch (error) {
    loggerError('部署失败');
    loggerError(error as string);
    shell.exit(1);
  }
};

async function getConfig(): Promise<{ projectName: string; config: TEnvItem }> {
  const configFileName = 'deploy_config.json';
  const configFilePath = path.resolve(projectDir, configFileName);
  const configExist = await fs.pathExists(configFilePath);
  if (!configExist) {
    loggerInfo('检测到配置文件不存在，下面请配置发布的环境');

    const {
      projectName,
      envName,
      host,
      port,
      username,
      password,
      distPath,
      webDir,
      script,
    } = await inquirer.prompt([
      {
        name: 'projectName',
        type: 'input',
        message: '请输入项目名称:',
      },
      {
        name: 'envName',
        type: 'input',
        message: '请输入环境名称:',
      },
      {
        name: 'host',
        type: 'input',
        message: '请输入服务器地址:',
      },
      {
        name: 'port',
        type: 'input',
        message: '请输入服务器端口:',
      },
      {
        name: 'username',
        type: 'input',
        message: '请输入登录服务器用户名:',
      },
      {
        name: 'password',
        type: 'input',
        message: '请输入登录服务器密码:',
      },
      {
        name: 'distPath',
        type: 'input',
        message: '请输入本地打包dist目录:',
      },
      {
        name: 'webDir',
        type: 'input',
        message: '请输入服务器项目地址:',
      },
      {
        name: 'script',
        type: 'input',
        message: '请输入打包命令:',
      },
    ]);

    const config = {
      projectName,
      env: {
        [envName]: {
          host,
          port,
          username,
          password,
          distPath,
          webDir,
          script,
        },
      },
    };
    await fs.createFile(configFileName);
    await jsonfile.writeFile(configFilePath, config, { spaces: 2 });

    loggerInfo('配置文件已生成，下面开始打包')
  }

  const file: TEnvConfig = await jsonfile.readFile(configFilePath);
  const allEnv = Object.keys(file.env);
  const { envName } = await inquirer.prompt([
    {
      name: 'envName',
      type: 'list',
      message: '请选择要发布的环境:',
      choices: allEnv.map((env) => ({
        name: env,
        value: env,
      })),
    },
  ]);
  const envConfig = file.env[envName];
  return {
    projectName: file.projectName,
    config: envConfig,
  };
}

// 第一步，执行打包脚本
function execBuild(script: string) {
  try {
    loggerInfo(`（1）${script}`);
    const spinner = ora('正在打包中...');
    spinner.start();
    const res = shell.exec(script, { silent: true });
    if (res.code === 0) {
      loggerSuccess('打包成功!');
    } else {
      loggerError(`run ${script} failed`);
      shell.exit(1);
    }
    spinner.stop();
  } catch (err) {
    loggerError(err as string);
    shell.exit(1);
  }
}

// 第二部，打包zip
function startZip(distPath: string) {
  return new Promise((resolve, reject) => {
    distPath = path.resolve(projectDir, distPath);
    loggerInfo('（2）正在打包成zip');
    const archive = archiver('zip', {
      zlib: { level: 9 },
    }).on('error', (err) => {
      throw err;
    });
    const output = fs.createWriteStream(`${projectDir}/dist.zip`);
    output.on('close', (err: string) => {
      if (err) {
        loggerError(`关闭archiver异常 ${err}`);
        reject(err);
        process.exit(1);
      }
      loggerSuccess('zip打包成功！');
      resolve(true);
    });
    archive.pipe(output);
    archive.directory(distPath, '/');
    archive.finalize();
  });
}

// 第三步，连接SSH
async function connectSSH(config: TEnvItem) {
  const { host, port, username, password } = config;
  const sshConfig = {
    host,
    port,
    username,
    password,
  };
  try {
    loggerInfo(`（3）正在连接服务器${loggerUnderline(host + ':' + port)}`);
    await ssh.connect(sshConfig);
    loggerSuccess('SSH连接成功');
  } catch (err) {
    loggerError(`连接失败 ${err}`);
    process.exit(1);
  }
}

// 第四部，上传zip包
async function uploadFile(webDir: string) {
  try {
    loggerInfo(`（4）正在上传zip至目录${loggerUnderline(webDir)}`);
    await ssh.putFile(`${projectDir}/dist.zip`, `${webDir}/dist.zip`);
    loggerSuccess('  zip包上传成功');
  } catch (err) {
    loggerError(`  zip包上传失败 ${err}`);
    process.exit(1);
  }
}

// 运行命令
async function runCommand(command: string, webDir: string) {
  await ssh.execCommand(command, { cwd: webDir });
}

// 第五步，解压zip包
async function unzipFile(webDir: string) {
  try {
    loggerInfo('（5）开始解压zip包');
    await runCommand(`cd ${webDir}`, webDir);
    await runCommand('unzip -o dist.zip && rm -f dist.zip', webDir);
    loggerSuccess('zip包解压成功');
  } catch (err) {
    loggerError(`zip包解压失败 ${err}`);
    process.exit(1);
  }
}

// 第六步，删除本地dist.zip包
async function deleteLocalZip() {
  return new Promise((resolve, reject) => {
    loggerInfo('（6）开始删除本地zip包');
    fs.unlink(`${projectDir}/dist.zip`, (err) => {
      if (err) {
        loggerError(`本地zip包删除失败 ${err}`);
        reject(err);
        process.exit(1);
      }
      loggerSuccess('  本地zip包删除成功\n');
      resolve(true);
    });
  });
}

export const deployCommand: TCommand = {
  description: 'deploy project',
  command: 'deploy',
  action: deploy,
};
