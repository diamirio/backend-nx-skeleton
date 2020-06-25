"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCorrectType = exports.parseArguments = void 0;
const chalk_1 = __importDefault(require("chalk"));
function parseArguments(task, args, validArgs, options) {
    const arg = args.split(',');
    const parsedValidArgs = validArgs.reduce((o, val) => {
        return [...o, val.name];
    }, []);
    const parsedArgs = arg.reduce((o, val) => {
        if (isCorrectType(parsedValidArgs, val)) {
            return [...o, val];
        }
        else {
            task.output = chalk_1.default.yellow(`Skipping "${val}" since it is not a valid entry.`);
            return o;
        }
    }, []);
    if (options.required && parsedArgs.length === 0) {
        throw new Error(`Arguments does not match the valid argument list of: ${parsedValidArgs}`);
    }
    if (options.single && parsedArgs.length !== 1) {
        throw new Error(`Only select one of the given valid argument list of: ${parsedValidArgs}`);
    }
    return parsedArgs;
}
exports.parseArguments = parseArguments;
function isCorrectType(keys, value) {
    return keys.indexOf(value) !== -1;
}
exports.isCorrectType = isCorrectType;
//# sourceMappingURL=normalize-options.helper.js.map