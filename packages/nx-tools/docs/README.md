@webundsoehne/nx-tools

# @webundsoehne/nx-tools

## Table of contents

### Namespaces

- [color](modules/color.md)

### Enumerations

- [BrownieAvailableContainers](enums/BrownieAvailableContainers.md)
- [NxConstants](enums/NxConstants.md)
- [NxProjectTypes](enums/NxProjectTypes.md)

### Classes

- [BaseBuilder](classes/BaseBuilder.md)
- [Logger](classes/Logger.md)
- [ProcessManager](classes/ProcessManager.md)

### Interfaces

- [BaseCreateApplicationFilesOptions](interfaces/BaseCreateApplicationFilesOptions.md)
- [BrownieIntegrationInterface](interfaces/BrownieIntegrationInterface.md)
- [CreateApplicationRuleInterface](interfaces/CreateApplicationRuleInterface.md)
- [CreateApplicationRuleOptions](interfaces/CreateApplicationRuleOptions.md)
- [EnrichedNxJson](interfaces/EnrichedNxJson.md)
- [EnrichedWorkspaceJson](interfaces/EnrichedWorkspaceJson.md)
- [EnrichedWorkspaceJsonProject](interfaces/EnrichedWorkspaceJsonProject.md)
- [ExecaArguments](interfaces/ExecaArguments.md)
- [FileTemplatesInterface](interfaces/FileTemplatesInterface.md)
- [FormatFilesOptions](interfaces/FormatFilesOptions.md)
- [GenerateExportsJinjaTemplateOptions](interfaces/GenerateExportsJinjaTemplateOptions.md)
- [JinjaTemplateOptions](interfaces/JinjaTemplateOptions.md)
- [LoggerOptions](interfaces/LoggerOptions.md)
- [MicroserviceIntegrationInterface](interfaces/MicroserviceIntegrationInterface.md)
- [MultipleFileTemplatesInterface](interfaces/MultipleFileTemplatesInterface.md)
- [MultipleJinjaTemplateOptions](interfaces/MultipleJinjaTemplateOptions.md)
- [MultipleJinjaTemplateTemplates](interfaces/MultipleJinjaTemplateTemplates.md)
- [OmitInterface](interfaces/OmitInterface.md)
- [PackageVersions](interfaces/PackageVersions.md)
- [PipeProcessToLoggerOptions](interfaces/PipeProcessToLoggerOptions.md)
- [SchematicFiles](interfaces/SchematicFiles.md)
- [TriggerActionsInterface](interfaces/TriggerActionsInterface.md)
- [VersionConstants](interfaces/VersionConstants.md)

### Type aliases

- [AssetGlob](README.md#assetglob)
- [AvailableAssetGlob](README.md#availableassetglob)
- [ConvertToPromptType](README.md#converttoprompttype)
- [DeepWriteable](README.md#deepwriteable)
- [DependencyCalculatorOptions](README.md#dependencycalculatoroptions)
- [FileInputOutput](README.md#fileinputoutput)
- [GeneratedNameCases](README.md#generatednamecases)
- [LinterDependencies](README.md#linterdependencies)
- [LogLevels](README.md#loglevels)
- [WorkspaceJSON](README.md#workspacejson)
- [Writeable](README.md#writeable)

### Variables

- [VERSION_CONSTANTS](README.md#version_constants)

### Functions

- [addEslintToTree](README.md#addeslinttotree)
- [addExternalSchematicTask](README.md#addexternalschematictask)
- [addGitTask](README.md#addgittask)
- [addInstallTask](README.md#addinstalltask)
- [addSchematicTask](README.md#addschematictask)
- [applyOverwriteWithDiff](README.md#applyoverwritewithdiff)
- [checkNodeModulesExists](README.md#checknodemodulesexists)
- [convertStringToDirPath](README.md#convertstringtodirpath)
- [createApplicationRule](README.md#createapplicationrule)
- [createDependenciesForProjectFromGraph](README.md#createdependenciesforprojectfromgraph)
- [createFileBackup](README.md#createfilebackup)
- [deepMerge](README.md#deepmerge)
- [deepMergeWithArrayOverwrite](README.md#deepmergewitharrayoverwrite)
- [deepMergeWithUniqueMergeArray](README.md#deepmergewithuniquemergearray)
- [dependencyCalculator](README.md#dependencycalculator)
- [doubleFileMerge](README.md#doublefilemerge)
- [eslintJson](README.md#eslintjson)
- [formatFiles](README.md#formatfiles)
- [formatOrSkip](README.md#formatorskip)
- [generateBuilderAssets](README.md#generatebuilderassets)
- [generateExportsRule](README.md#generateexportsrule)
- [generateNameCases](README.md#generatenamecases)
- [getFilesInTree](README.md#getfilesintree)
- [getJinjaDefaults](README.md#getjinjadefaults)
- [getNodeBinaryPath](README.md#getnodebinarypath)
- [getWorkspace](README.md#getworkspace)
- [installWorkspaceDependencies](README.md#installworkspacedependencies)
- [isCorrectType](README.md#iscorrecttype)
- [isVerbose](README.md#isverbose)
- [jinjaTemplate](README.md#jinjatemplate)
- [mapPromptChoices](README.md#mappromptchoices)
- [mergeDependencies](README.md#mergedependencies)
- [mergeFiles](README.md#mergefiles)
- [multipleJinjaTemplate](README.md#multiplejinjatemplate)
- [parseArguments](README.md#parsearguments)
- [pipeProcessThroughListr](README.md#pipeprocessthroughlistr)
- [pipeProcessToLogger](README.md#pipeprocesstologger)
- [readBrownieContainers](README.md#readbrowniecontainers)
- [readBrownieIntegration](README.md#readbrownieintegration)
- [readMicroserviceIntegration](README.md#readmicroserviceintegration)
- [readNxIntegration](README.md#readnxintegration)
- [readWorkspaceJson](README.md#readworkspacejson)
- [removePathRoot](README.md#removepathroot)
- [replaceExtension](README.md#replaceextension)
- [runBuilder](README.md#runbuilder)
- [runInRule](README.md#runinrule)
- [selectivePatch](README.md#selectivepatch)
- [setSchemaDefaultsInContext](README.md#setschemadefaultsincontext)
- [tripleFileMerge](README.md#triplefilemerge)
- [updateBrownieIntegration](README.md#updatebrownieintegration)
- [updateNxIntegration](README.md#updatenxintegration)
- [updateTsconfigPaths](README.md#updatetsconfigpaths)

## Type aliases

### AssetGlob

Ƭ **AssetGlob**: [`FileInputOutput`](README.md#fileinputoutput) & { `glob`: `string` ; `ignore?`: `string`[] }

#### Defined in

packages/nx-tools/src/interfaces/assets.interface.ts:8

---

### AvailableAssetGlob

Ƭ **AvailableAssetGlob**: ([`AssetGlob`](README.md#assetglob) \| `string`)[]

#### Defined in

packages/nx-tools/src/interfaces/assets.interface.ts:1

---

### ConvertToPromptType

Ƭ **ConvertToPromptType**<`T`\>: { [name: string]: `any`; `message`: `string` ; `name`: `T` }[]

Converts a input type into the prompt type that is consumed by enquirer.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

packages/nx-tools/src/init/parse-arguments.interface.ts:4

---

### DeepWriteable

Ƭ **DeepWriteable**<`T`\>: { -readonly[P in keyof T]: DeepWriteable<T[P]\>}

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

packages/nx-tools/src/interfaces/helper-types.interface.ts:3

---

### DependencyCalculatorOptions

Ƭ **DependencyCalculatorOptions**: { `condition?`: `boolean` ; `deps`: [`PackageVersions`](interfaces/PackageVersions.md) }[]

#### Defined in

packages/nx-tools/src/utils/schematics/dependency-calculator.interface.ts:3

---

### FileInputOutput

Ƭ **FileInputOutput**: `Object`

#### Type declaration

| Name     | Type     |
| :------- | :------- |
| `input`  | `string` |
| `output` | `string` |

#### Defined in

packages/nx-tools/src/interfaces/assets.interface.ts:3

---

### GeneratedNameCases

Ƭ **GeneratedNameCases**: `Record`<`"camel"` \| `"kebab"` \| `"snake"` \| `"upper"` \| `"pascal"`, `string`\>

#### Defined in

packages/nx-tools/src/utils/schematics/generate-name-cases.interface.ts:1

---

### LinterDependencies

Ƭ **LinterDependencies**: `Object`

To add linter dependencies to project. This has no optional properties since NX goes crazy with current version of angular-cli ~10.

#### Type declaration

| Name              | Type                          |
| :---------------- | :---------------------------- |
| `dependencies`    | `Record`<`string`, `string`\> |
| `devDependencies` | `Record`<`string`, `string`\> |

#### Defined in

packages/nx-tools/src/interfaces/linter-dependencies.interface.ts:5

---

### LogLevels

Ƭ **LogLevels**: keyof `Omit`<`LoggerApi`, `"createChild"` \| `"log"`\>

#### Defined in

packages/nx-tools/src/utils/logger/logger.interface.ts:3

---

### WorkspaceJSON

Ƭ **WorkspaceJSON**<`T`\>: `Object`

workspace.json is where all of the nx data is stored.

#### Type parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `T`  | extends `Record`<`string`, `any`\>`any` |

#### Type declaration

| Name             | Type     |
| :--------------- | :------- |
| `defaultProject` | `string` |
| `projects`       | `Object` |

#### Defined in

packages/nx-tools/src/interfaces/add-project.interface.ts:4

---

### Writeable

Ƭ **Writeable**<`T`\>: { -readonly[P in keyof T]: T[P]}

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Defined in

packages/nx-tools/src/interfaces/helper-types.interface.ts:1

## Variables

### VERSION_CONSTANTS

• `Const` **VERSION_CONSTANTS**: [`VersionConstants`](interfaces/VersionConstants.md)

Version constants that is shared through multiple places.

#### Defined in

packages/nx-tools/src/utils/versions.constants.ts:6

## Functions

### addEslintToTree

▸ **addEslintToTree**<`T`\>(`host`, `log`, `options`, `eslint`): `Rule`

Adding eslint to workspace

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `Object` |

#### Parameters

| Name          | Type                          |
| :------------ | :---------------------------- |
| `host`        | `Tree`                        |
| `log`         | [`Logger`](classes/Logger.md) |
| `options`     | `T`                           |
| `eslint`      | `Object`                      |
| `eslint.deps` | `any`                         |
| `eslint.json` | `any`                         |

#### Returns

`Rule`

Rule

#### Defined in

packages/nx-tools/src/rules/add-eslint.rule.ts:16

---

### addExternalSchematicTask

▸ **addExternalSchematicTask**<`T`\>(`c`, `s`, `o`): `Rule`

Add a external schmatic task to run after the actions finish.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type     |
| :--- | :------- |
| `c`  | `string` |
| `s`  | `string` |
| `o`  | `T`      |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/init/run-schematic-after.ts:21

---

### addGitTask

▸ **addGitTask**(`options?`): `Rule`

Add a git init task to context to install the dependencies, ripped of from nx but it has the functionallity to chdir.

#### Parameters

| Name                      | Type      |
| :------------------------ | :-------- |
| `options?`                | `Object`  |
| `options.commit?`         | `Object`  |
| `options.commit.email`    | `string`  |
| `options.commit.message?` | `string`  |
| `options.commit.name`     | `string`  |
| `options.root?`           | `string`  |
| `options.skipGit?`        | `boolean` |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/init/initialize-git.ts:8

---

### addInstallTask

▸ **addInstallTask**(`options?`): `Rule`

Add a install task to context to install the dependencies, ripped of from nx but it has the functionallity to chdir.

#### Parameters

| Name                   | Type      |
| :--------------------- | :-------- |
| `options?`             | `Object`  |
| `options.root?`        | `string`  |
| `options.skipInstall?` | `boolean` |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/init/install-dependencies.ts:53

---

### addSchematicTask

▸ **addSchematicTask**<`T`\>(`s`, `o`): `Rule`

Add a schematic task to run after the actions finish.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type     |
| :--- | :------- |
| `s`  | `string` |
| `o`  | `T`      |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/init/run-schematic-after.ts:9

---

### applyOverwriteWithDiff

▸ **applyOverwriteWithDiff**(`source`, `oldSource`, `context`): `Rule`

Given two sources, this will try to diff-merge prior and new configuration and apply it to current configuration.

If given one source, it will only apply what is missing from the current file and does not delete anything.

NX have a problem with its internal overwriting data mechanism so it is generated this way.

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `source`    | `Source`           |
| `oldSource` | `Source` \| `void` |
| `context`   | `SchematicContext` |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/rules/overwrite-with-diff.rule.ts:21

---

### checkNodeModulesExists

▸ **checkNodeModulesExists**(`paths`): `void`

Check if file that is supposed to be executable is defined inside the node_modules folder.

#### Parameters

| Name    | Type                          |
| :------ | :---------------------------- |
| `paths` | `Record`<`string`, `string`\> |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/file-system/file-system.ts:24

---

### convertStringToDirPath

▸ **convertStringToDirPath**(`dir`, `options?`): `string`

#### Parameters

| Name             | Type      |
| :--------------- | :-------- |
| `dir`            | `string`  |
| `options`        | `Object`  |
| `options.end?`   | `boolean` |
| `options.start?` | `boolean` |

#### Returns

`string`

#### Defined in

packages/nx-tools/src/utils/file-system/general.ts:1

---

### createApplicationRule

▸ **createApplicationRule**<`T`\>(`appRule`, `options?`, `ruleOptions?`): `Rule`[]

Returns a general application rule that can be used in schematics.

#### Type parameters

| Name | Type                                                                                           |
| :--- | :--------------------------------------------------------------------------------------------- |
| `T`  | extends [`BaseCreateApplicationFilesOptions`](interfaces/BaseCreateApplicationFilesOptions.md) |

#### Parameters

| Name           | Type                                                                             |
| :------------- | :------------------------------------------------------------------------------- |
| `appRule`      | [`CreateApplicationRuleInterface`](interfaces/CreateApplicationRuleInterface.md) |
| `options?`     | `T`                                                                              |
| `ruleOptions?` | [`CreateApplicationRuleOptions`](interfaces/CreateApplicationRuleOptions.md)     |

#### Returns

`Rule`[]

#### Defined in

packages/nx-tools/src/rules/create-application.rule.ts:13

---

### createDependenciesForProjectFromGraph

▸ **createDependenciesForProjectFromGraph**(`graph`, `project`): `Record`<`string`, `string`\>

Will create a dependency graph from nx project graph.

#### Parameters

| Name      | Type           |
| :-------- | :------------- |
| `graph`   | `ProjectGraph` |
| `project` | `string`       |

#### Returns

`Record`<`string`, `string`\>

#### Defined in

packages/nx-tools/src/utils/node/dependency-resolver.ts:8

---

### createFileBackup

▸ **createFileBackup**(`host`, `file`, `log`): `void`

Creates a file backup in tree.

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `host` | `Tree`                        |
| `file` | `FileEntry`                   |
| `log`  | [`Logger`](classes/Logger.md) |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/rules/overwrite-with-diff.rule.ts:280

---

### deepMerge

▸ **deepMerge**<`T`\>(`t`, ...`s`): `T`

Merge objects with defaults.

Mutates the object.

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `t`    | `T`               |
| `...s` | `Partial`<`T`\>[] |

#### Returns

`T`

#### Defined in

packages/nx-tools/src/utils/node/merge-with-filters.ts:12

---

### deepMergeWithArrayOverwrite

▸ **deepMergeWithArrayOverwrite**<`T`\>(`t`, ...`s`): `T`

Merge objects with overwriting the target array with source array.

Mutates the object.

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `t`    | `T`               |
| `...s` | `Partial`<`T`\>[] |

#### Returns

`T`

#### Defined in

packages/nx-tools/src/utils/node/merge-with-filters.ts:40

---

### deepMergeWithUniqueMergeArray

▸ **deepMergeWithUniqueMergeArray**<`T`\>(`t`, ...`s`): `T`

Merge objects with array merge and filtering them uniquely.

Mutates the object.

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> |

#### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `t`    | `T`               |
| `...s` | `Partial`<`T`\>[] |

#### Returns

`T`

#### Defined in

packages/nx-tools/src/utils/node/merge-with-filters.ts:25

---

### dependencyCalculator

▸ **dependencyCalculator**(`options`): [`PackageVersions`](interfaces/PackageVersions.md)

Calculates the dependencies with a given condition, returns the package versions merged.

#### Parameters

| Name      | Type                                                                   |
| :-------- | :--------------------------------------------------------------------- |
| `options` | [`DependencyCalculatorOptions`](README.md#dependencycalculatoroptions) |

#### Returns

[`PackageVersions`](interfaces/PackageVersions.md)

#### Defined in

packages/nx-tools/src/utils/schematics/dependency-calculator.ts:9

---

### doubleFileMerge

▸ **doubleFileMerge**(`name`, `newFile`, `currentFile`, `log`): `string` \| `boolean`

Double file merge only adds changes on the new file to the current file. No delete operation will be performed.

#### Parameters

| Name          | Type                          |
| :------------ | :---------------------------- |
| `name`        | `string`                      |
| `newFile`     | `string`                      |
| `currentFile` | `string`                      |
| `log`         | [`Logger`](classes/Logger.md) |

#### Returns

`string` \| `boolean`

#### Defined in

packages/nx-tools/src/rules/overwrite-with-diff.rule.ts:183

---

### eslintJson

▸ **eslintJson**(`options`): `Record`<`string`, `any`\>

Default eslint configuration to inject to repository.

#### Parameters

| Name                    | Type                       |
| :---------------------- | :------------------------- |
| `options`               | `Object`                   |
| `options.override?`     | `Record`<`string`, `any`\> |
| `options.packageScope?` | `string`                   |

#### Returns

`Record`<`string`, `any`\>

#### Defined in

packages/nx-tools/src/constants/lint.constants.ts:4

---

### formatFiles

▸ **formatFiles**(`options?`): `Rule`

Format files as a rule in a tree.

Requires configuration to be present in the current tree.

Will use prettier first, others after.

#### Parameters

| Name      | Type                                                     |
| :-------- | :------------------------------------------------------- |
| `options` | [`FormatFilesOptions`](interfaces/FormatFilesOptions.md) |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/utils/file-system/format-files.ts:20

---

### formatOrSkip

▸ **formatOrSkip**(`log`, `skip?`, `options?`): `Rule`

Returns a general prettier-eslint format rule for schematics.

#### Parameters

| Name      | Type                                                     |
| :-------- | :------------------------------------------------------- |
| `log`     | [`Logger`](classes/Logger.md)                            |
| `skip?`   | `boolean`                                                |
| `options` | [`FormatFilesOptions`](interfaces/FormatFilesOptions.md) |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/rules/format-with-skip.rule.ts:12

---

### generateBuilderAssets

▸ **generateBuilderAssets**(`options`, `assets`): [`FileInputOutput`](README.md#fileinputoutput)[]

#### Parameters

| Name                    | Type                                               |
| :---------------------- | :------------------------------------------------- |
| `options`               | `Object`                                           |
| `options.cwd?`          | `string`                                           |
| `options.outDir`        | `string`                                           |
| `options.workspaceRoot` | `string`                                           |
| `assets`                | ([`AssetGlob`](README.md#assetglob) \| `string`)[] |

#### Returns

[`FileInputOutput`](README.md#fileinputoutput)[]

#### Defined in

packages/nx-tools/src/utils/schematics/copy-assets.ts:7

---

### generateExportsRule

▸ **generateExportsRule**(`source`, `options`, `templatePath`): `Rule`

Generates from given template. Will search for multiple files that match the import case and will export them from root of the output file.

#### Parameters

| Name           | Type                                                                                         |
| :------------- | :------------------------------------------------------------------------------------------- |
| `source`       | `Source`                                                                                     |
| `options`      | [`GenerateExportsJinjaTemplateOptions`](interfaces/GenerateExportsJinjaTemplateOptions.md)   |
| `templatePath` | [`MultipleJinjaTemplateTemplates`](interfaces/MultipleJinjaTemplateTemplates.md)[``"path"``] |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/rules/generate-exports.rule.ts:17

---

### generateNameCases

▸ **generateNameCases**(`name`): [`GeneratedNameCases`](README.md#generatednamecases)

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

[`GeneratedNameCases`](README.md#generatednamecases)

#### Defined in

packages/nx-tools/src/utils/schematics/generate-name-cases.ts:5

---

### getFilesInTree

▸ **getFilesInTree**(`tree`, `filter?`): `Set`<`Object`\>

Will return the files in the given source tree applying the filters.

#### Parameters

| Name      | Type                              |
| :-------- | :-------------------------------- |
| `tree`    | `Tree`                            |
| `filter?` | (`action`: `Action`) => `boolean` |

#### Returns

`Set`<`Object`\>

#### Defined in

packages/nx-tools/src/utils/file-system/file-system.ts:43

---

### getJinjaDefaults

▸ **getJinjaDefaults**(`options?`): typeof `nunjucks`

Default settings for jinja compatible nunjucks.

#### Parameters

| Name       | Type                        |
| :--------- | :-------------------------- |
| `options?` | `nunjucks.ConfigureOptions` |

#### Returns

typeof `nunjucks`

#### Defined in

packages/nx-tools/src/templates/jinja-defaults.ts:7

---

### getNodeBinaryPath

▸ **getNodeBinaryPath**(`bin?`): `string`

Returns the binary path for a given cli in node_modules.

**`export`**

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `bin?` | `string` |

#### Returns

`string`

#### Defined in

packages/nx-tools/src/utils/file-system/node-bin.ts:11

---

### getWorkspace

▸ **getWorkspace**(`context`, `host`): `Promise`<`workspaces.WorkspaceDefinition`\>

Will return the workspace definition.

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `context` | `BuilderContext` |
| `host`    | `Host`           |

#### Returns

`Promise`<`workspaces.WorkspaceDefinition`\>

#### Defined in

packages/nx-tools/src/utils/file-system/file-system.ts:13

---

### installWorkspaceDependencies

▸ **installWorkspaceDependencies**(`options?`): `Rule`

**`deprecated`** Template should not use the yarn workspaces anymore.

Installs yarn workspace dependencies.

#### Parameters

| Name            | Type     |
| :-------------- | :------- |
| `options?`      | `Object` |
| `options.root?` | `string` |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/init/install-dependencies.ts:13

---

### isCorrectType

▸ **isCorrectType**<`T`\>(`keys`, `value`): value is T

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `keys`  | `string`[] |
| `value` | `any`      |

#### Returns

value is T

#### Defined in

packages/nx-tools/src/init/parse-arguments.ts:54

---

### isVerbose

▸ **isVerbose**(): `boolean`

Returns if angular cli is running with verbose flag.s

#### Returns

`boolean`

#### Defined in

packages/nx-tools/src/utils/schematics/is-verbose.ts:4

---

### jinjaTemplate

▸ **jinjaTemplate**(`ctx`, `options`): `Rule`

Generates jinja templates with given context.

#### Parameters

| Name      | Type                                                         |
| :-------- | :----------------------------------------------------------- |
| `ctx`     | `Record`<`string`, `any`\>                                   |
| `options` | [`JinjaTemplateOptions`](interfaces/JinjaTemplateOptions.md) |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/templates/template-engine.ts:16

---

### mapPromptChoices

▸ **mapPromptChoices**<`T`\>(`self`, `names`): [`ConvertToPromptType`](README.md#converttoprompttype)<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                          |
| :------ | :---------------------------- |
| `self`  | `any`                         |
| `names` | `Record`<`string`, `string`\> |

#### Returns

[`ConvertToPromptType`](README.md#converttoprompttype)<`T`\>

#### Defined in

packages/nx-tools/src/init/parse-arguments.ts:58

---

### mergeDependencies

▸ **mergeDependencies**(...`dependenciesObjects`): `Record`<`string`, `string`\>

Merge multiple set of dependencies together.

#### Parameters

| Name                     | Type                            |
| :----------------------- | :------------------------------ |
| `...dependenciesObjects` | `Record`<`string`, `string`\>[] |

#### Returns

`Record`<`string`, `string`\>

#### Defined in

packages/nx-tools/src/utils/node/dependency-resolver.ts:40

---

### mergeFiles

▸ **mergeFiles**(`host`, `file`, `mergedFiles`, `log`): `void`

Merges files the common part.

#### Parameters

| Name          | Type                          |
| :------------ | :---------------------------- |
| `host`        | `Tree`                        |
| `file`        | `FileEntry`                   |
| `mergedFiles` | `string` \| `boolean`         |
| `log`         | [`Logger`](classes/Logger.md) |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/rules/overwrite-with-diff.rule.ts:258

---

### multipleJinjaTemplate

▸ **multipleJinjaTemplate**<`T`\>(`ctx`, `options`): `Rule`

Generates multiple files from single template with dynamic context.

#### Type parameters

| Name | Type                               |
| :--- | :--------------------------------- |
| `T`  | extends `Record`<`string`, `any`\> |

#### Parameters

| Name      | Type                                                                               |
| :-------- | :--------------------------------------------------------------------------------- |
| `ctx`     | `T`                                                                                |
| `options` | [`MultipleJinjaTemplateOptions`](interfaces/MultipleJinjaTemplateOptions.md)<`T`\> |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/templates/template-engine.ts:68

---

### parseArguments

▸ **parseArguments**<`T`\>(`task`, `args`, `validArgs`, `options?`): `T`

**`deprecated`** Now nx schema.json should be utilized better.

Parses arguments coming from the cli. The arguments can multiple separated by commas or single. The argument can be marked as required, which in that case will throw an error if not provided.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                | Type                              |
| :------------------ | :-------------------------------- |
| `task`              | `ListrTaskWrapper`<`any`, `any`\> |
| `args`              | `string` \| `string`[]            |
| `validArgs`         | { `name`: `string` }[]            |
| `options?`          | `Object`                          |
| `options.required?` | `boolean`                         |
| `options.single?`   | `boolean`                         |

#### Returns

`T`

#### Defined in

packages/nx-tools/src/init/parse-arguments.ts:17

---

### pipeProcessThroughListr

▸ **pipeProcessThroughListr**(`task`, `instance`): `execa.ExecaChildProcess`

#### Parameters

| Name       | Type                              |
| :--------- | :-------------------------------- |
| `task`     | `ListrTaskWrapper`<`any`, `any`\> |
| `instance` | `execa.ExecaChildProcess`         |

#### Returns

`execa.ExecaChildProcess`

#### Defined in

packages/nx-tools/src/utils/logger/pipe-process-to-listr.ts:5

---

### pipeProcessToLogger

▸ **pipeProcessToLogger**(`context`, `instance`, `options?`): `ExecaChildProcess`

Given the instance it will pipe process output through the logger to append prefixes such as the application name.

#### Parameters

| Name       | Type                                                                     |
| :--------- | :----------------------------------------------------------------------- |
| `context`  | `BuilderContext`                                                         |
| `instance` | `ExecaChildProcess`                                                      |
| `options?` | [`PipeProcessToLoggerOptions`](interfaces/PipeProcessToLoggerOptions.md) |

#### Returns

`ExecaChildProcess`

#### Defined in

packages/nx-tools/src/utils/logger/pipe-process-to-logger.ts:14

---

### readBrownieContainers

▸ **readBrownieContainers**(): [`BrownieAvailableContainers`](enums/BrownieAvailableContainers.md)[]

Returns sum of brownie containers read from nx.json.

#### Returns

[`BrownieAvailableContainers`](enums/BrownieAvailableContainers.md)[]

#### Defined in

packages/nx-tools/src/integration/brownie.ts:33

---

### readBrownieIntegration

▸ **readBrownieIntegration**(`name`): [`BrownieIntegrationInterface`](interfaces/BrownieIntegrationInterface.md)

Returns the brownie integration part of the nx.json.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

[`BrownieIntegrationInterface`](interfaces/BrownieIntegrationInterface.md)

#### Defined in

packages/nx-tools/src/integration/brownie.ts:26

---

### readMicroserviceIntegration

▸ **readMicroserviceIntegration**(): [`MicroserviceIntegrationInterface`](interfaces/MicroserviceIntegrationInterface.md)[]

Reads microservice integration part of the nx.json.

#### Returns

[`MicroserviceIntegrationInterface`](interfaces/MicroserviceIntegrationInterface.md)[]

#### Defined in

packages/nx-tools/src/integration/microservice-provider.ts:9

---

### readNxIntegration

▸ **readNxIntegration**<`T`\>(`name`): `T`

Returns the integration filed of nx.json.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

`T`

#### Defined in

packages/nx-tools/src/integration/nx-json.ts:34

---

### readWorkspaceJson

▸ **readWorkspaceJson**(`name`): [`EnrichedWorkspaceJson`](interfaces/EnrichedWorkspaceJson.md)[`"projects"`][``"name"``]

Returns the whole workspace.json for a given application.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `name` | `string` |

#### Returns

[`EnrichedWorkspaceJson`](interfaces/EnrichedWorkspaceJson.md)[`"projects"`][``"name"``]

#### Defined in

packages/nx-tools/src/integration/nx-json.ts:42

---

### removePathRoot

▸ **removePathRoot**(`filename`, `sourceRoot`): `string`

Removes the source root from the given path.

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `filename`   | `string` |
| `sourceRoot` | `string` |

#### Returns

`string`

#### Defined in

packages/nx-tools/src/utils/file-system/path-operations.ts:23

---

### replaceExtension

▸ **replaceExtension**(`path`, `extension`): `string`

Replaces given extension.

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `path`      | `string` |
| `extension` | `string` |

#### Returns

`string`

#### Defined in

packages/nx-tools/src/utils/file-system/path-operations.ts:8

---

### runBuilder

▸ **runBuilder**<`T`, `BuilderOptions`\>(`Builder`): (`options`: `BuilderOptions`, `context`: `BuilderContext`) => `Observable`<`BuilderOutput`\>

Run a designated builder that is extended from base builder in NX way.

#### Type parameters

| Name             | Type                                                                                                                                           |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `T`              | extends (`options`: `BuilderOptions`, `context`: `BuilderContext`) => [`BaseBuilder`](classes/BaseBuilder.md)<`BuilderOptions`, `any`, `any`\> |
| `BuilderOptions` | extends `Record`<`string`, `any`\>                                                                                                             |

#### Parameters

| Name      | Type |
| :-------- | :--- |
| `Builder` | `T`  |

#### Returns

`fn`

▸ (`options`, `context`): `Observable`<`BuilderOutput`\>

Run a designated builder that is extended from base builder in NX way.

##### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `options` | `BuilderOptions` |
| `context` | `BuilderContext` |

##### Returns

`Observable`<`BuilderOutput`\>

#### Defined in

packages/nx-tools/src/utils/builders/run-builder.ts:13

---

### runInRule

▸ **runInRule**(`run`, `condition?`): `Rule`

Run something in a rule. It is just a empty function runs on condition. Just added to make everything look cleaner.

#### Parameters

| Name        | Type                           | Default value |
| :---------- | :----------------------------- | :------------ |
| `run`       | (...`args`: `any`[]) => `void` | `undefined`   |
| `condition` | `boolean`                      | `true`        |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/rules/run.rule.ts:8

---

### selectivePatch

▸ **selectivePatch**(`patch`, `select`): `diff.ParsedDiff`

Selectively applies patches where you can define to only add or remove items.

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `patch`  | `diff.ParsedDiff`     |
| `select` | `"add"` \| `"remove"` |

#### Returns

`diff.ParsedDiff`

#### Defined in

packages/nx-tools/src/rules/overwrite-with-diff.rule.ts:210

---

### setSchemaDefaultsInContext

▸ **setSchemaDefaultsInContext**<`T`, `K`\>(`ctx`, `options`): `void`

Given the context it initiates default keys and keys transfered over from the angular-schematics. Will mutate the object! That is the idea.

#### Type parameters

| Name | Type                       |
| :--- | :------------------------- |
| `T`  | `Record`<`string`, `any`\> |
| `K`  | `Record`<`string`, `any`\> |

#### Parameters

| Name                  | Type              | Description                                                                 |
| :-------------------- | :---------------- | :-------------------------------------------------------------------------- |
| `ctx`                 | `T`               |                                                                             |
| `options`             | `Object`          | While it will assign the keys directly in assign, it will set the defaults. |
| `options.assign?`     | `Object`          | -                                                                           |
| `options.assign.from` | `K`               | -                                                                           |
| `options.assign.keys` | keyof `K`[]       | -                                                                           |
| `options.default?`    | `Partial`<`T`\>[] | -                                                                           |

#### Returns

`void`

#### Defined in

packages/nx-tools/src/utils/schematics/defaults.ts:7

---

### tripleFileMerge

▸ **tripleFileMerge**(`name`, `currentFile`, `oldFile`, `newFile`, `log`): `string` \| `boolean`

Triple file merge will compare old with new file and apply the changes to the current file.

#### Parameters

| Name          | Type                          |
| :------------ | :---------------------------- |
| `name`        | `string`                      |
| `currentFile` | `string`                      |
| `oldFile`     | `string`                      |
| `newFile`     | `string`                      |
| `log`         | [`Logger`](classes/Logger.md) |

#### Returns

`string` \| `boolean`

#### Defined in

packages/nx-tools/src/rules/overwrite-with-diff.rule.ts:159

---

### updateBrownieIntegration

▸ **updateBrownieIntegration**(`name`, `options`): `Rule`

Updates brownie integration by wiriting data to nx.json

#### Parameters

| Name      | Type                                                                       |
| :-------- | :------------------------------------------------------------------------- |
| `name`    | `string`                                                                   |
| `options` | [`BrownieIntegrationInterface`](interfaces/BrownieIntegrationInterface.md) |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/integration/brownie.ts:13

---

### updateNxIntegration

▸ **updateNxIntegration**<`T`\>(`name`, `options`): `Rule`

Updates nx integration by saving values like prior configuration or so for having a memory.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `name`    | `string` |
| `options` | `T`      |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/integration/nx-json.ts:12

---

### updateTsconfigPaths

▸ **updateTsconfigPaths**<`T`\>(`options`): `Rule`

Updates tsconfig paths in the tsconfig.json

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `Object` |

#### Parameters

| Name      | Type |
| :-------- | :--- |
| `options` | `T`  |

#### Returns

`Rule`

#### Defined in

packages/nx-tools/src/integration/update-ts-config.ts:9
