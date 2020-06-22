"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintJson = exports.eslintDeps = void 0;
const versions_1 = require("./versions");
exports.eslintDeps = {
    dependencies: {},
    devDependencies: {
        'eslint-plugin-import': versions_1.eslintPluginImportVersion
    }
};
exports.eslintJson = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        node: true
    },
    settings: {},
    plugins: ['import'],
    rules: {}
};
//# sourceMappingURL=lint.js.map