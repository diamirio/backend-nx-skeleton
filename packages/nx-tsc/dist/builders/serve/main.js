"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBuilder = void 0;
const architect_1 = require("@angular-devkit/architect");
const node_1 = require("@angular-devkit/core/node");
const nx_tools_1 = require("@webundsoehne/nx-tools");
const child_process_1 = require("child_process");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
function startTypescriptNode(options, context, root, callback) {
    const { entry, tsConfig, debounce, interval, debug, cwd } = options;
    const args = [
        '-r',
        'tsconfig-paths/register'
    ];
    if (tsConfig) {
        args.push('--project');
        args.push(cwd ? nx_tools_1.removePathRoot(tsConfig, cwd) : tsConfig);
    }
    if (debounce) {
        args.push('--debounce');
        args.push(`${debounce}`);
    }
    if (interval) {
        args.push('--interval');
        args.push(`${interval}`);
    }
    if (debug) {
        args.push('--debug');
    }
    if (!entry) {
        throw new Error('No entry point set');
    }
    args.push(cwd ? nx_tools_1.removePathRoot(entry, cwd) : entry);
    const spawnOptions = {
        env: {
            NODE_ENV: 'develop',
            ...process.env
        }
    };
    if (cwd) {
        spawnOptions.cwd = cwd;
    }
    const tsNodeDev = child_process_1.spawn('ts-node-dev', args, spawnOptions);
    tsNodeDev.stdout.on('data', (data) => {
        nx_tools_1.logProject('info', context, data);
    });
    tsNodeDev.stderr.on('data', (data) => {
        nx_tools_1.logProject('error', context, data);
    });
    tsNodeDev.on('exit', (code, signal) => {
        context.logger.info(`ts-node-dev process ended with code ${code} ${signal ? `and signal ${signal}` : 'no signal'}`);
        callback();
    });
    tsNodeDev.on('error', (error) => {
        callback(error);
    });
    return tsNodeDev;
}
function runBuilder(options, context) {
    const host = new node_1.NodeJsSyncHost();
    return rxjs_1.from(nx_tools_1.getWorkspace(context, host))
        .pipe(operators_1.switchMap((workspace) => {
        const { root } = workspace.projects.get(context.target.project);
        return new rxjs_1.Observable((observer) => {
            const tsNodeDevProcess = startTypescriptNode(options, context, root, (error) => {
                if (error) {
                    observer.error(error);
                }
                else {
                    observer.complete();
                }
            });
            if (tsNodeDevProcess.pid == null) {
                observer.next({ success: false });
            }
            else {
                observer.next({ success: true });
            }
            return () => {
                tsNodeDevProcess.kill();
            };
        });
    }));
}
exports.runBuilder = runBuilder;
exports.default = architect_1.createBuilder(runBuilder);
//# sourceMappingURL=main.js.map