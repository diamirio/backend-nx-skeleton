"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApplicationFiles = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
function createApplicationFiles(options) {
    return schematics_1.mergeWith(schematics_1.apply(schematics_1.url('./files'), [
        !options.database.includes('typeorm')
            ? schematics_1.filter((file) => !file.match('__typeorm__'))
            : schematics_1.noop(),
        schematics_1.template({
            ...workspace_1.names(options.name),
            ...options,
            tmpl: '',
            typeorm: '',
            offsetFromRoot: workspace_1.offsetFromRoot(options.root)
        }),
        options.tests === 'none'
            ? schematics_1.filter((file) => file !== '*.spec.ts')
            : schematics_1.noop(),
        !options.components.includes('server')
            ? schematics_1.filter((file) => !file.match('src/server/'))
            : schematics_1.noop(),
        !options.components.includes('bgtask')
            ? schematics_1.filter((file) => !file.match('src/task/'))
            : schematics_1.noop(),
        !options.components.includes('command')
            ? schematics_1.filter((file) => !file.match('src/command/'))
            : schematics_1.noop(),
        schematics_1.move(options.root)
    ]));
}
exports.createApplicationFiles = createApplicationFiles;
//# sourceMappingURL=create-application-files.js.map