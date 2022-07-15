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
var path_1 = __importDefault(require("path"));
var ora_1 = __importDefault(require("ora"));
var util_1 = __importDefault(require("util"));
var tmp_1 = __importDefault(require("tmp"));
var download_git_repo_1 = __importDefault(require("download-git-repo"));
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
                    // 开始加载动画
                    spinner.start();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fn.apply(void 0, args)];
                case 2:
                    result = _a.sent();
                    // 状态为修改为成功
                    spinner.succeed();
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _a.sent();
                    // 状态为修改为失败
                    spinner.fail('Request failed, refetch ...');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var Generator = /** @class */ (function () {
    function Generator(name, targetDir) {
        // 目录名称
        this.name = name;
        // 创建位置
        this.targetDir = targetDir;
        // 改造 download-git-repo 支持 promise
        this.downloadGitRepo = util_1.default.promisify(download_git_repo_1.default);
    }
    Generator.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tpmobj, requestUrl, downloadResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tpmobj = tmp_1.default.dirSync();
                        requestUrl = "Ectimi/project-template";
                        console.log('download dir=>', path_1.default.resolve(tpmobj.name));
                        return [4 /*yield*/, wrapLoading(this.downloadGitRepo, // 远程下载方法
                            'waiting download template', // 加载提示信息
                            requestUrl, // 参数1: 下载地址
                            path_1.default.resolve(tpmobj.name))];
                    case 1:
                        downloadResult = _a.sent();
                        console.log('download result ==>', downloadResult);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Generator;
}());
module.exports = Generator;
