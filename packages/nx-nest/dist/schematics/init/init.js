"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const workspace_1 = require("@nrwl/workspace");
function setDefault() {
    const updateThisWorkspace = workspace_1.updateWorkspace((workspace) => {
        workspace.extensions.schematics =
            jsonIdentity(workspace.extensions.schematics) || {};
    });
    return schematics_1.chain([workspace_1.setDefaultCollection('@webundsoehne/nx-nest'), updateThisWorkspace]);
}
function jsonIdentity(x) {
    return x;
}
function default_1(schema) {
    return schematics_1.chain([
        setDefault(),
        workspace_1.addDepsToPackageJson({}, {})
    ]);
}
exports.default = default_1;
//# sourceMappingURL=init.js.map