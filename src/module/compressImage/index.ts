import chalk from 'chalk';
import { TCommand } from '../../types';
import { loggerError, loggerSuccess } from '../../util';

const { compress } = require('compress-images/promise');

async function compressImage(image: string, options: { list: string }) {
  let input_path;
  if (options.list) {
    input_path = `${options.list}/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}`;
  } else {
    input_path = `${image}`;
  }
  const out_path = `__compress_output__${new Date().getTime()}/`;

  try {
    const { errors } = await compress({
      source: input_path,
      destination: out_path,
      enginesSetup: {
        jpg: { engine: 'mozjpeg', command: ['-quality', '60'] },
        png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] },
        svg: { engine: 'svgo', command: '--multipass' },
        gif: {
          engine: 'gifsicle',
          command: ['--colors', '64', '--use-col=web'],
        },
      },
    });

    if (errors.length === 0) {
      loggerSuccess('图片压缩成功');
    } else {
      loggerError('图片压缩失败');
      console.log(chalk.red(errors));
    }
  } catch (error) {
    loggerError(error as string);
  }
}

export const compressImageCommand: TCommand = {
  description: 'compress image',
  command: 'compress [image]',
  options: [
    {
      command: '-l --list <dir>',
      description: 'Compress the image in the current directory',
    },
  ],
  action: compressImage,
};
