/**
 * To add linter dependencies to project.
 * This has no optional properties since NX goes crazy with current version of angular-cli ~10.
 */
export type LinterDependencies = { dependencies: Record<string, string>, devDependencies: Record<string, string> }
