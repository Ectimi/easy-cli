"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployCommand = exports.deploy = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var path_1 = __importDefault(require("path"));
var ora_1 = __importDefault(require("ora"));
var jsonfile_1 = __importDefault(require("jsonfile"));
var shelljs_1 = __importDefault(require("shelljs"));
var node_ssh_1 = require("node-ssh");
var archiver_1 = __importDefault(require("archiver"));
var util_1 = require("../../util");
var projectDir = process.cwd();
var ssh = new node_ssh_1.NodeSSH();
var deploy = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectName, config, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                return [4 /*yield*/, getConfig()];
            case 1:
                _a = _b.sent(), projectName = _a.projectName, config = _a.config;
                execBuild(config.script);
                return [4 /*yield*/, startZip(config.distPath)];
            case 2:
                _b.sent();
                return [4 /*yield*/, connectSSH(config)];
            case 3:
                _b.sent();
                return [4 /*yield*/, uploadFile(config.webDir)];
            case 4:
                _b.sent();
                return [4 /*yield*/, unzipFile(config.webDir)];
            case 5:
                _b.sent();
                return [4 /*yield*/, deleteLocalZip()];
            case 6:
                _b.sent();
                (0, util_1.loggerSuccess)("".concat((0, util_1.loggerUnderline)(projectName), "\u9879\u76EE\u90E8\u7F72\u6210\u529F^_^\n"));
                shelljs_1.default.exit(0);
                return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                (0, util_1.loggerError)('部署失败');
                (0, util_1.loggerError)(error_1);
                shelljs_1.default.exit(1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.deploy = deploy;
function getConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var configFileName, configFilePath, configExist, _a, projectName, envName_1, host, port, username, password, distPath, webDir, script, config, file, allEnv, envName, envConfig;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    configFileName = 'deploy_config.json';
                    configFilePath = path_1.default.resolve(projectDir, configFileName);
                    return [4 /*yield*/, fs_extra_1.default.pathExists(configFilePath)];
                case 1:
                    configExist = _c.sent();
                    if (!!configExist) return [3 /*break*/, 5];
                    (0, util_1.loggerInfo)('检测到配置文件不存在，下面请配置发布的环境');
                    return [4 /*yield*/, inquirer_1.default.prompt([
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
                        ])];
                case 2:
                    _a = _c.sent(), projectName = _a.projectName, envName_1 = _a.envName, host = _a.host, port = _a.port, username = _a.username, password = _a.password, distPath = _a.distPath, webDir = _a.webDir, script = _a.script;
                    config = {
                        projectName: projectName,
                        env: (_b = {},
                            _b[envName_1] = {
                                host: host,
                                port: port,
                                username: username,
                                password: password,
                                distPath: distPath,
                                webDir: webDir,
                                script: script,
                            },
                            _b),
                    };
                    return [4 /*yield*/, fs_extra_1.default.createFile(configFileName)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, jsonfile_1.default.writeFile(configFilePath, config, { spaces: 2 })];
                case 4:
                    _c.sent();
                    (0, util_1.loggerInfo)('配置文件已生成，下面开始打包');
                    _c.label = 5;
                case 5: return [4 /*yield*/, jsonfile_1.default.readFile(configFilePath)];
                case 6:
                    file = _c.sent();
                    allEnv = Object.keys(file.env);
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                name: 'envName',
                                type: 'list',
                                message: '请选择要发布的环境:',
                                choices: allEnv.map(function (env) { return ({
                                    name: env,
                                    value: env,
                                }); }),
                            },
                        ])];
                case 7:
                    envName = (_c.sent()).envName;
                    envConfig = file.env[envName];
                    return [2 /*return*/, {
                            projectName: file.projectName,
                            config: envConfig,
                        }];
            }
        });
    });
}
// 第一步，执行打包脚本
function execBuild(script) {
    try {
        (0, util_1.loggerInfo)("\uFF081\uFF09".concat(script));
        var spinner = (0, ora_1.default)('正在打包中...');
        spinner.start();
        var res = shelljs_1.default.exec(script, { silent: true });
        if (res.code === 0) {
            (0, util_1.loggerSuccess)('打包成功!');
        }
        else {
            (0, util_1.loggerError)("run ".concat(script, " failed"));
            shelljs_1.default.exit(1);
        }
        spinner.stop();
    }
    catch (err) {
        (0, util_1.loggerError)(err);
        shelljs_1.default.exit(1);
    }
}
// 第二部，打包zip
function startZip(distPath) {
    return new Promise(function (resolve, reject) {
        distPath = path_1.default.resolve(projectDir, distPath);
        (0, util_1.loggerInfo)('（2）正在打包成zip');
        var archive = (0, archiver_1.default)('zip', {
            zlib: { level: 9 },
        }).on('error', function (err) {
            throw err;
        });
        var output = fs_extra_1.default.createWriteStream("".concat(projectDir, "/dist.zip"));
        output.on('close', function (err) {
            if (err) {
                (0, util_1.loggerError)("\u5173\u95EDarchiver\u5F02\u5E38 ".concat(err));
                reject(err);
                process.exit(1);
            }
            (0, util_1.loggerSuccess)('zip打包成功！');
            resolve(true);
        });
        archive.pipe(output);
        archive.directory(distPath, '/');
        archive.finalize();
    });
}
// 第三步，连接SSH
function connectSSH(config) {
    return __awaiter(this, void 0, void 0, function () {
        var host, port, username, password, sshConfig, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    host = config.host, port = config.port, username = config.username, password = config.password;
                    sshConfig = {
                        host: host,
                        port: port,
                        username: username,
                        password: password,
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    (0, util_1.loggerInfo)("\uFF083\uFF09\u6B63\u5728\u8FDE\u63A5\u670D\u52A1\u5668".concat((0, util_1.loggerUnderline)(host + ':' + port)));
                    return [4 /*yield*/, ssh.connect(sshConfig)];
                case 2:
                    _a.sent();
                    (0, util_1.loggerSuccess)('SSH连接成功');
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    (0, util_1.loggerError)("\u8FDE\u63A5\u5931\u8D25 ".concat(err_1));
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// 第四部，上传zip包
function uploadFile(webDir) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    (0, util_1.loggerInfo)("\uFF084\uFF09\u6B63\u5728\u4E0A\u4F20zip\u81F3\u76EE\u5F55".concat((0, util_1.loggerUnderline)(webDir)));
                    return [4 /*yield*/, ssh.putFile("".concat(projectDir, "/dist.zip"), "".concat(webDir, "/dist.zip"))];
                case 1:
                    _a.sent();
                    (0, util_1.loggerSuccess)('  zip包上传成功');
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    (0, util_1.loggerError)("  zip\u5305\u4E0A\u4F20\u5931\u8D25 ".concat(err_2));
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// 运行命令
function runCommand(command, webDir) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ssh.execCommand(command, { cwd: webDir })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// 第五步，解压zip包
function unzipFile(webDir) {
    return __awaiter(this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    (0, util_1.loggerInfo)('（5）开始解压zip包');
                    return [4 /*yield*/, runCommand("cd ".concat(webDir), webDir)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, runCommand('unzip -o dist.zip && rm -f dist.zip', webDir)];
                case 2:
                    _a.sent();
                    (0, util_1.loggerSuccess)('zip包解压成功');
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    (0, util_1.loggerError)("zip\u5305\u89E3\u538B\u5931\u8D25 ".concat(err_3));
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// 第六步，删除本地dist.zip包
function deleteLocalZip() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    (0, util_1.loggerInfo)('（6）开始删除本地zip包');
                    fs_extra_1.default.unlink("".concat(projectDir, "/dist.zip"), function (err) {
                        if (err) {
                            (0, util_1.loggerError)("\u672C\u5730zip\u5305\u5220\u9664\u5931\u8D25 ".concat(err));
                            reject(err);
                            process.exit(1);
                        }
                        (0, util_1.loggerSuccess)('  本地zip包删除成功\n');
                        resolve(true);
                    });
                })];
        });
    });
}
exports.deployCommand = {
    description: 'deploy project',
    command: 'deploy',
    action: exports.deploy,
};
