"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
const versions_1 = require("../../utils/versions");
function setDefault() {
    const updateReactWorkspace = workspace_1.updateWorkspace((workspace) => {
        workspace.extensions.schematics =
            jsonIdentity(workspace.extensions.schematics) || {};
        const reactSchematics = jsonIdentity(workspace.extensions.schematics['@nrwl/react']) || {};
        workspace.extensions.schematics = {
            ...workspace.extensions.schematics,
            '@nrwl/react': {
                ...reactSchematics,
                application: {
                    ...jsonIdentity(reactSchematics.application),
                    babel: true
                }
            }
        };
    });
    return schematics_1.chain([workspace_1.setDefaultCollection('@nrwl/react'), updateReactWorkspace]);
}
function jsonIdentity(x) {
    return x;
}
function default_1(schema) {
    return schematics_1.chain([
        setDefault(),
        schema.tests === 'jest'
            ? workspace_1.addPackageWithInit('@nrwl/jest')
            : schematics_1.noop(),
        workspace_1.addDepsToPackageJson({}, {
            '@nrwl/react': versions_1.nxVersion
        })
    ]);
}
exports.default = default_1;
//# sourceMappingURL=main.js.map