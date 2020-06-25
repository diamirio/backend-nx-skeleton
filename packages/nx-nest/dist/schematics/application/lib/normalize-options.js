"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeOptions = void 0;
const core_1 = require("@angular-devkit/core");
const workspace_1 = require("@nrwl/workspace");
const ast_utils_1 = require("@nrwl/workspace/src/utils/ast-utils");
const listr2_1 = require("listr2");
const normalize_options_helper_1 = require("./normalize-options.helper");
async function normalizeOptions(host, options) {
    return new listr2_1.Listr([
        {
            task: async (ctx) => {
                await Promise.all(['name', 'tests', 'linter'].map((item) => {
                    ctx[item] = options[item];
                }));
            }
        },
        {
            task: (ctx) => {
                if (options.directory) {
                    ctx.directory = `${workspace_1.toFileName(options.directory)}/${workspace_1.toFileName(options.name)}`;
                }
                else {
                    ctx.directory = workspace_1.toFileName(options.name);
                }
            }
        },
        {
            title: 'Normalizing project name.',
            task: (ctx, task) => {
                ctx.name = ctx.directory.replace(new RegExp('/', 'g'), '-');
                task.title = `Project name is set as "${ctx.name}".`;
            }
        },
        {
            title: 'Setting project root directory.',
            task: (ctx, task) => {
                ctx.root = core_1.normalize(`${ast_utils_1.appsDir(host)}/${ctx.directory}`);
                task.title = `Project root directory is set as "${ctx.root}".`;
            }
        },
        {
            task: async (ctx, task) => {
                const choices = [
                    { name: 'server', message: 'Server' },
                    { name: 'bgtask', message: 'Scheduler' },
                    { name: 'command', message: 'Command' }
                ];
                if (!options.components) {
                    ctx.components = await task.prompt({
                        type: 'MultiSelect',
                        message: 'Please select which components you want to include.',
                        choices: choices
                    });
                }
                else {
                    ctx.components = normalize_options_helper_1.parseArguments(task, options.components, choices, { required: true });
                }
                task.title = `Server components selected: ${ctx.components}`;
            },
            options: {
                bottomBar: Infinity,
                persistentOutput: true
            }
        },
        {
            skip: (ctx) => !ctx.components.includes('server'),
            task: async (ctx, task) => {
                const choices = [
                    { name: 'restful', message: 'RESTFUL' },
                    { name: 'graphql', message: 'GraphQL' }
                ];
                if (!options.server) {
                    ctx.server = await task.prompt({
                        type: 'Select',
                        message: 'Please select the API server type.',
                        choices: choices
                    });
                }
                else {
                    ctx.server = normalize_options_helper_1.parseArguments(task, options.server, choices, { required: true, single: true });
                }
                task.title = `Server type selected as: ${ctx.server}`;
            },
            options: {
                bottomBar: Infinity,
                persistentOutput: true
            }
        },
        {
            skip: (ctx) => !ctx.components.includes('server'),
            task: async (ctx, task) => {
                const choices = [
                    { name: 'none', message: 'None' },
                    { name: 'typeorm-mysql', message: 'Typeorm - MySQL' },
                    { name: 'typeorm-postgresql', message: 'Typeorm - PostgreSQL' },
                    { name: 'mongoose-mongodb', message: 'Mongoose - MongoDB' }
                ];
                if (!options.database) {
                    ctx.database = await task.prompt({
                        type: 'Select',
                        message: 'Please select the database type.',
                        choices: choices
                    });
                }
                else {
                    ctx.database = normalize_options_helper_1.parseArguments(task, options.database, choices, { required: true, single: true });
                }
                task.title = `Database selected as: ${ctx.database}`;
            },
            options: {
                bottomBar: Infinity,
                persistentOutput: true
            }
        }
    ], {
        concurrent: false
    }).run();
}
exports.normalizeOptions = normalizeOptions;
//# sourceMappingURL=normalize-options.js.map