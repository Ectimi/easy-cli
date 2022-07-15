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
exports.generateTemplate = void 0;
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var ora_1 = __importDefault(require("ora"));
var util_1 = __importDefault(require("util"));
var tmp_1 = __importDefault(require("tmp"));
var download_git_repo_1 = __importDefault(require("download-git-repo"));
var downloadGit = util_1.default.promisify(download_git_repo_1.default);
function wrapLoading(fn, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var spinner, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner = (0, ora_1.default)(message);
                    spinner.start();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fn.apply(void 0, args)];
                case 2:
                    result = _a.sent();
                    spinner.succeed();
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _a.sent();
                    spinner.fail('Request failed, pleact check the network ...');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var generateTemplate = function (name, options) { return __awaiter(void 0, void 0, void 0, function () {
    function create(targetDir) {
        return __awaiter(this, void 0, void 0, function () {
            var tmpobj, requestUrl, types, type, templates, templateName, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tmpobj = tmp_1.default.dirSync();
                        requestUrl = "Ectimi/project-template";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        return [4 /*yield*/, wrapLoading(downloadGit, // 远程下载方法
                            'loading template , please wait...', // 加载提示信息
                            requestUrl, // 参数1: 下载地址
                            path_1.default.resolve(tmpobj.name))];
                    case 2:
                        _a.sent(); // 参数2: 创建位置
                        return [4 /*yield*/, fs_extra_1.default.readdir(tmpobj.name)];
                    case 3:
                        types = _a.sent();
                        return [4 /*yield*/, inquirer_1.default.prompt([
                                {
                                    name: 'type',
                                    type: 'list',
                                    message: 'Please select template type:',
                                    choices: types.map(function (name) { return ({
                                        name: name,
                                        value: name,
                                    }); }),
                                },
                            ])];
                    case 4:
                        type = (_a.sent()).type;
                        if (!!type) return [3 /*break*/, 5];
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, fs_extra_1.default.readdir(path_1.default.resolve(tmpobj.name, type))];
                    case 6:
                        templates = _a.sent();
                        console.log('templates=>', templates);
                        return [4 /*yield*/, inquirer_1.default.prompt([
                                {
                                    name: 'templateName',
                                    type: 'list',
                                    message: 'Please select a template:',
                                    choices: templates.map(function (name) { return ({
                                        name: name,
                                        value: name,
                                    }); }),
                                },
                            ])];
                    case 7:
                        templateName = (_a.sent()).templateName;
                        if (!!templateName) return [3 /*break*/, 8];
                        return [2 /*return*/];
                    case 8: return [4 /*yield*/, fs_extra_1.default.copy(path_1.default.resolve(tmpobj.name, type, templateName), targetDir)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [4 /*yield*/, fs_extra_1.default.emptyDir(tmpobj.name)];
                    case 11:
                        _a.sent();
                        tmpobj.removeCallback();
                        console.log("\r\nSuccessfully created project ".concat(chalk_1.default.cyan(name)));
                        console.log("\r\n  cd ".concat(chalk_1.default.cyan(name)));
                        return [3 /*break*/, 13];
                    case 12:
                        error_2 = _a.sent();
                        console.log('create failed');
                        console.log('error =>', chalk_1.default.red(error_2));
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    }
    var cwd, targetDir, action;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cwd = process.cwd();
                targetDir = path_1.default.join(cwd, name);
                if (!fs_extra_1.default.existsSync(targetDir)) return [3 /*break*/, 6];
                if (!options.force) return [3 /*break*/, 2];
                return [4 /*yield*/, fs_extra_1.default.remove(targetDir)];
            case 1:
                _a.sent();
                return [3 /*break*/, 6];
            case 2: return [4 /*yield*/, inquirer_1.default.prompt([
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
                ])];
            case 3:
                action = (_a.sent()).action;
                if (!!action) return [3 /*break*/, 4];
                return [2 /*return*/];
            case 4:
                if (!(action === 'overwrite')) return [3 /*break*/, 6];
                console.log('\r\nRemoving...');
                return [4 /*yield*/, fs_extra_1.default.remove(targetDir)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                fs_extra_1.default.mkdirSync(targetDir);
                create(targetDir);
                return [2 /*return*/];
        }
    });
}); };
exports.generateTemplate = generateTemplate;
