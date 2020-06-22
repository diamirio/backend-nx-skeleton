"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const core_1 = require("@angular-devkit/core");
const workspace_1 = require("@nrwl/workspace");
const ast_utils_1 = require("@nrwl/workspace/src/utils/ast-utils");
function normalizeOptions(host, options) {
    const appDirectory = options.directory
        ? `${workspace_1.toFileName(options.directory)}/${workspace_1.toFileName(options.name)}`
        : workspace_1.toFileName(options.name);
    const appProjectName = appDirectory.replace(new RegExp('/', 'g'), '-');
    const appProjectRoot = core_1.normalize(`${ast_utils_1.appsDir(host)}/${appDirectory}`);
    return {
        ...options,
        name: workspace_1.toFileName(options.name),
        projectName: appProjectName,
        appProjectRoot
    };
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map