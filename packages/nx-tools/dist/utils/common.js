"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkspace = void 0;
const core_1 = require("@angular-devkit/core");
async function getWorkspace(context, host) {
    const workspaceHost = core_1.workspaces.createWorkspaceHost(host);
    const { workspace } = await core_1.workspaces.readWorkspace(context.workspaceRoot, workspaceHost);
    return workspace;
}
exports.getWorkspace = getWorkspace;
//# sourceMappingURL=common.js.map