import { ProjectGraph, ProjectGraphDependency } from '@nrwl/workspace/src/core/project-graph';
export declare function resolveDependencies(dependencies: Record<string, ProjectGraphDependency[]>, project: string): string[];
export declare function dependenciesForProject(graph: ProjectGraph, project: string): Record<string, any>;
