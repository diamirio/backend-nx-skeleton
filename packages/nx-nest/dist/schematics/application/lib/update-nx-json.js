"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNxJson = void 0;
const workspace_1 = require("@nrwl/workspace");
function updateNxJson(options) {
    return workspace_1.updateJsonInTree('nx.json', (json) => {
        json.projects[options.projectName] = { tags: [] };
        return json;
    });
}
exports.updateNxJson = updateNxJson;
//# sourceMappingURL=update-nx-json.js.map