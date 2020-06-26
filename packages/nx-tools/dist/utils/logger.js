"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logProject = void 0;
const chalk_1 = __importDefault(require("chalk"));
const os_1 = require("os");
function logProject(level, context, data) {
    const lines = data.toString().split(os_1.EOL);
    const project = context.target.project;
    lines.forEach((line) => {
        if (line !== '') {
            context.logger.log(level, `[${chalk_1.default.green.bold(`${project}] `)}${line}`);
        }
    });
}
exports.logProject = logProject;
//# sourceMappingURL=logger.js.map