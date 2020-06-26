/// <reference types="node" />
import { BuilderContext } from '@angular-devkit/architect';
import { LoggerApi } from '@angular-devkit/core/src/logger';
export declare function logProject(level: keyof Omit<LoggerApi, 'createChild' | 'log'>, context: BuilderContext, data: string | Buffer): void;
