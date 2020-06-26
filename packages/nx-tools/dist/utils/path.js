"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePathRoot = exports.replaceExtension = void 0;
const path_1 = require("path");
function replaceExtension(path, extension) {
    const { dir, name } = path_1.parse(path);
    if (extension.startsWith('.')) {
        extension = extension.substring(1);
    }
    return path_1.join(dir, `${name}.${extension}`);
}
exports.replaceExtension = replaceExtension;
function removePathRoot(filename, sourceRoot) {
    if (filename.startsWith(sourceRoot)) {
        const path = filename.substring(sourceRoot.length);
        return path.startsWith('/') ? path.substring(1) : path;
    }
    throw new Error('Root path could not be removed');
}
exports.removePathRoot = removePathRoot;
//# sourceMappingURL=path.js.map