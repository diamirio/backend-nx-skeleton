"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependenciesForProject = exports.resolveDependencies = void 0;
function resolveDependencies(dependencies, project) {
    const resolveDependencies = [];
    let unresolvedDependencies = dependencies[project];
    while (unresolvedDependencies.length > 0) {
        const { target } = unresolvedDependencies.pop();
        if (!resolveDependencies.includes(target)) {
            resolveDependencies.push(target);
            unresolvedDependencies = [...unresolvedDependencies, ...dependencies[target]];
        }
    }
    return resolveDependencies;
}
exports.resolveDependencies = resolveDependencies;
function dependenciesForProject(graph, project) {
    const { dependencies, nodes } = graph;
    const localDependencies = [];
    if (project in dependencies) {
        const projectDependencies = resolveDependencies(dependencies, project);
        projectDependencies.forEach((target) => {
            if (nodes[target].type === 'lib') {
                localDependencies.push(nodes[target]);
            }
        });
    }
    else {
        throw new Error('Project not found in dependency graph');
    }
    return {
        localDependencies
    };
}
exports.dependenciesForProject = dependenciesForProject;
//# sourceMappingURL=dependencies.js.map