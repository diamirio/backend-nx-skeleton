import { ListrTaskWrapper } from 'listr2';
import { AvailableComponents } from '../schema';
export declare function parseArguments<T>(task: ListrTaskWrapper<any, any>, args: string, validArgs: {
    name: string;
}[], options?: {
    required?: boolean;
    single?: boolean;
}): T;
export declare function isCorrectType(keys: string[], value: string): value is AvailableComponents;
