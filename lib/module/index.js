"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eslint_1 = require("./eslint");
var template_1 = require("./template");
var deploy_1 = require("./deploy");
exports.default = [eslint_1.eslintCommad, template_1.createCommad, deploy_1.deployCommand];
