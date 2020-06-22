"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationFiles = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
function createApplicationFiles(options) {
    return schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
        schematics_1.template({
            ...workspace_1.names(options.name),
            ...options,
            tmpl: '',
            offsetFromRoot: workspace_1.offsetFromRoot(options.appProjectRoot)
        }),
        options.tests === 'none'
            ? schematics_1.filter((file) => file !== '/src/app/TEST.spec.tsx')
            : schematics_1.noop(),
        schematics_1.move(options.appProjectRoot)
    ]));
}
exports.createApplicationFiles = createApplicationFiles;
//# sourceMappingURL=create-application-files.js.map