import path, { resolve } from "path";
import { version } from "process";
import chalk from "chalk";
import fs from "fs-extra";

// 项目本地路径
export const getDirPath = (relPath: string = "") => {
  return resolve(__dirname, relPath);
};

// 获取运行路径
export const getCwdPath = (relPath: string = "") => {
  return resolve(process.cwd(), relPath);
};

// 计时日志
export const loggerTiming = (str: string = "", start: boolean = true) => {
  if (start) {
    console.time("Timing");
    console.log(chalk.cyan(`****** ${str} START ******`));
  } else {
    console.log(chalk.cyan(`****** ${str} END ******`));
    console.timeEnd("Timing");
  }
};

// 普通日志
export const loggerInfo = (str: string = "") => {
  console.log(chalk.green(`\r\n[INFO]： ${str}`));
};

// 警告日志
export const loggerWarring = (str: string = "") => {
  console.log(chalk.yellowBright(`\r\n[WARRING]： ${str}`));
};

// 成功日志
export const loggerSuccess = (str: string = "") => {
  console.log(chalk.greenBright(`\r\n[SUCCESS]： ${str}`));
};

// 报错日志
export const loggerError = (str: string = "") => {
  console.log(chalk.redBright(`\r\n[ERROR]： ${str}`));
};

// 下划线重点输出
export const loggerUnderline = (str: string = "") => {
  return chalk.blue.underline.bold(str);
};



export const cpSync = (source: string, destination: string) => {
  try {
    const major = version.match(/v([0-9]*).([0-9]*)/)![1];
    /** 特性版本 */
    const minor = version.match(/v([0-9]*).([0-9]*)/)![2];

    if (fs.existsSync(destination)) fs.rmSync(destination, { recursive: true });

    // 判断node版本不是16.7.0以上的版本
    // 则进入兼容处理
    // 这样处理是因为16.7.0的版本支持了直接复制文件夹的操作
    if (Number(major) < 16 || (Number(major) == 16 && Number(minor) < 7)) {
      // 如果存在文件夹 先递归删除该文件夹
      if (fs.existsSync(destination))
        fs.rmSync(destination, { recursive: true });
      // 新建文件夹 递归新建
      fs.mkdirSync(destination, { recursive: true });
      // 读取源文件夹
      let rd = fs.readdirSync(source);
      for (const fd of rd) {
        // 循环拼接源文件夹/文件全名称
        let sourceFullName = source + "/" + fd;
        // 循环拼接目标文件夹/文件全名称
        let destFullName = destination + "/" + fd;
        // 读取文件信息
        let lstatRes = fs.lstatSync(sourceFullName);
        // 是否是文件
        if (lstatRes.isFile()) fs.copyFileSync(sourceFullName, destFullName);
        // 是否是文件夹
        if (lstatRes.isDirectory()) cpSync(sourceFullName, destFullName);
      }
    } else fs.cpSync(source, destination, { force: true, recursive: true });
  } catch (error) {
    console.log(chalk.red(error));
  }
};
