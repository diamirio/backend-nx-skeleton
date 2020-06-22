"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const lint_1 = require("../../utils/lint");
const main_1 = __importDefault(require("../init/main"));
const add_project_1 = require("./lib/add-project");
const create_application_files_1 = require("./lib/create-application-files");
const normalize_options_1 = require("./lib/normalize-options");
const set_defaults_1 = require("./lib/set-defaults");
const update_nx_json_1 = require("./lib/update-nx-json");
function default_1(schema) {
    return (host, context) => {
        const options = normalize_options_1.normalizeOptions(host, schema);
        return schematics_1.chain([
            main_1.default({
                ...options,
                skipFormat: true
            }),
            workspace_1.addLintFiles(options.appProjectRoot, options.linter, {
                localConfig: lint_1.eslintJson,
                extraPackageDeps: lint_1.eslintDeps
            }),
            create_application_files_1.createApplicationFiles(options),
            update_nx_json_1.updateNxJson(options),
            add_project_1.addProject(options),
            set_defaults_1.setDefaults(options),
            workspace_1.formatFiles(options)
        ]);
    };
}
exports.default = default_1;
//# sourceMappingURL=main.js.map