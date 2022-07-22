import jsonfile from 'jsonfile';
import XLSX from 'xlsx';
import shelljs from 'shelljs';
import { TCommand } from '../../types';
import { getCwdPath, loggerSuccess, loggerError } from '../../util';

async function xlsx2json(file: string, options: { output: string }) {
  try {
    const data: any[] = [];
    const workbook = XLSX.readFile(getCwdPath(file), { type: 'binary' });
    const worksheets = workbook.Sheets;

    for (const sheet in worksheets) {
      if (workbook.Sheets.hasOwnProperty(sheet)) {
        data.push({
          [sheet]: XLSX.utils.sheet_to_json(workbook.Sheets[sheet]),
        });
      }
    }

    const result = {};

    for (let i = 0; i < data.length; i++) {
      Object.assign(result, data[i]);
    }

    const outputName = options.output || `output_${new Date().getTime()}`;
    await jsonfile.writeFile(`${outputName}.json`, result, {
      spaces: 2,
    });

    loggerSuccess('转换完成');
    shelljs.exit(0);
  } catch (error) {
    loggerError(error as string);
    shelljs.exit(1);
  }
}

async function json2xlsx(file: string,options: { output: string }) {
  try {
    const workbook = XLSX.utils.book_new();
    const jsondata = await jsonfile.readFile(file);
    const sheetNames = Object.keys(jsondata);
    const arraydata = [];

    for (let i = 0; i < sheetNames.length; i++) {
      arraydata.push(jsondata[sheetNames[i]]);
    }
    for (let i = 0; i < arraydata.length; i++) {
      const worksheet = XLSX.utils.json_to_sheet(arraydata[i]);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetNames[i], true);
    }

    const outputName = options.output || `output_${new Date().getTime()}`;
    XLSX.writeFile(workbook, `${outputName}.xlsx`);

    loggerSuccess('转换完成');
    shelljs.exit(0);
  } catch (error) {
    loggerError(error as string);
    shelljs.exit(1);
  }
}

export const xlsxCommads: TCommand[] = [
  {
    description: 'convert xlsx to json',
    command: 'x2j <file>',
    options: [
      {
        command: '-o --output <name>',
        description: 'set output name',
      },
    ],
    action: xlsx2json,
  },
  {
    description: 'convert json to xlsx',
    command: 'j2x <file>',
    options: [
      {
        command: '-o --output <name>',
        description: 'set output name',
      },
    ],
    action: json2xlsx,
  },
];
