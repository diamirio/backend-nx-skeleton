"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProject = void 0;
const core_1 = require("@angular-devkit/core");
const workspace_1 = require("@nrwl/workspace");
function addProject(options) {
    return workspace_1.updateWorkspaceInTree((json) => {
        const architect = {};
        architect.build = {
            builder: '@nrwl/web:build',
            options: {
                outputPath: core_1.join(core_1.normalize('dist'), options.appProjectRoot),
                index: core_1.join(options.appProjectRoot, 'src/index.html'),
                main: core_1.join(options.appProjectRoot, 'src/main.tsx'),
                polyfills: core_1.join(options.appProjectRoot, 'src/polyfills.ts'),
                tsConfig: core_1.join(options.appProjectRoot, 'tsconfig.build.json'),
                assets: [
                    core_1.join(options.appProjectRoot, 'src/favicon.ico'),
                    core_1.join(options.appProjectRoot, 'src/assets')
                ],
                scripts: [],
                webpackConfig: '@nrwl/react/plugins/webpack'
            },
            configurations: {
                production: {
                    fileReplacements: [
                        {
                            replace: core_1.join(options.appProjectRoot, 'src/environments/environment.ts'),
                            with: core_1.join(options.appProjectRoot, 'src/environments/environment.prod.ts')
                        }
                    ],
                    optimization: true,
                    outputHashing: 'all',
                    sourceMap: false,
                    extractCss: true,
                    namedChunks: false,
                    extractLicenses: true,
                    vendorChunk: false,
                    budgets: [
                        {
                            type: 'initial',
                            maximumWarning: '2mb',
                            maximumError: '5mb'
                        }
                    ]
                }
            }
        };
        architect.serve = {
            builder: '@nrwl/web:dev-server',
            options: {
                buildTarget: `${options.projectName}:build`
            },
            configurations: {
                production: {
                    buildTarget: `${options.projectName}:build:production`
                }
            }
        };
        architect.lint = workspace_1.generateProjectLint(core_1.normalize(options.appProjectRoot), core_1.join(core_1.normalize(options.appProjectRoot), 'tsconfig.app.json'), options.linter);
        json.projects[options.projectName] = {
            root: options.appProjectRoot,
            sourceRoot: core_1.join(options.appProjectRoot, 'src'),
            projectType: 'application',
            schematics: {},
            architect
        };
        json.defaultProject = json.defaultProject || options.projectName;
        return json;
    });
}
exports.addProject = addProject;
//# sourceMappingURL=add-project.js.map