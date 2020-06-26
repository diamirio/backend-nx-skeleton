import { BuilderContext } from '@angular-devkit/architect';
import { workspaces } from '@angular-devkit/core';
export declare function getWorkspace(context: BuilderContext, host: any): Promise<workspaces.WorkspaceDefinition>;
