import { ProjectGraph } from '@nrwl/workspace/src/core/project-graph';
export declare function readPackageJsonFromPath(path: string): string;
export declare function writePackageJsonToPath(packageJson: object, path: string): void;
export declare function createDependenciesForProjectFromGraph(graph: ProjectGraph, project: string): Record<string, string>;
export declare function mergeDependencies(...dependenciesObjects: Record<string, string>[]): Record<string, string>;
