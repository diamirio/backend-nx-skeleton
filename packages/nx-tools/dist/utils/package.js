"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDependencies = exports.createDependenciesForProjectFromGraph = exports.writePackageJsonToPath = exports.readPackageJsonFromPath = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function readPackageJsonFromPath(path) {
    try {
        return JSON.parse(fs_1.readFileSync(path_1.join(path, 'package.json'), 'utf8'));
    }
    catch (error) {
        throw new Error('Could not read package.json');
    }
}
exports.readPackageJsonFromPath = readPackageJsonFromPath;
function writePackageJsonToPath(packageJson, path) {
    try {
        return fs_1.writeFileSync(path_1.join(path, 'package.json'), JSON.stringify(packageJson, null, 4), 'utf8');
    }
    catch (error) {
        throw new Error('Could not write package.json');
    }
}
exports.writePackageJsonToPath = writePackageJsonToPath;
function createDependenciesForProjectFromGraph(graph, project) {
    const npmDependencies = {};
    const projects = [project];
    while (projects.length > 0) {
        const project = projects.shift();
        graph.dependencies[project].forEach((dependency) => {
            try {
                const { type, name, data } = graph.nodes[dependency.target];
                switch (type) {
                    case 'npm':
                        npmDependencies[name] = data.version;
                        break;
                    case 'lib':
                        projects.push(name);
                        break;
                }
            }
            catch (error) {
                throw new Error(`Could not resolve dependency for ${dependency.target}`);
            }
        });
    }
    return npmDependencies;
}
exports.createDependenciesForProjectFromGraph = createDependenciesForProjectFromGraph;
function mergeDependencies(...dependenciesObjects) {
    const mergedDependencies = {};
    dependenciesObjects.forEach((dependencies) => {
        Object.entries(dependencies).forEach(([dependency, version]) => {
            if (dependency in mergedDependencies && version !== mergedDependencies[dependency]) {
                throw new Error(`Could not merge dependencies for ${dependency}: Version mismatch ${version} <-> ${mergedDependencies[dependency]}`);
            }
            else {
                mergedDependencies[dependency] = version;
            }
        });
    });
    return mergedDependencies;
}
exports.mergeDependencies = mergeDependencies;
//# sourceMappingURL=package.js.map