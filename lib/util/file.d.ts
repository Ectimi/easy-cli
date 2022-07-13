export declare const loadFile: <T = {}>(path: string, system?: boolean) => false | T | undefined;
export declare const existsFile: (path: string, system?: boolean) => boolean;
/**
 * @description: 写入文件
 * @param {string} path
 * @param {string} fileName
 * @param {string} file
 * @return {*}
 */
export declare const writeFile: (path: string, fileName: string, file: object, system?: boolean) => void;
