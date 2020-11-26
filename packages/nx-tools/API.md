## Classes

<dl>
<dt><a href="#BaseBuilder">BaseBuilder</a></dt>
<dd><p>Base builder for extending from.</p></dd>
<dt><a href="#Logger">Logger</a></dt>
<dd><p>A general logger that is wrapped around the angular-cli logger.</p>
<p>It is not great but winston was not working that well in a amazingly stateless architecture.</p></dd>
<dt><a href="#ProcessManager">ProcessManager</a></dt>
<dd><p>Process manager is an instance where it tracks current child processes.abs</p>
<p>You can add long-living and short-living process to keep track of processes spawned by node.</p></dd>
</dl>

## Members

<dl>
<dt><a href="#NxConstants">NxConstants</a></dt>
<dd><p>Some NX constants.
They seem to change every minor patch XD</p></dd>
<dt><a href="#NxConstants">NxConstants</a></dt>
<dd><p>Nx application types</p></dd>
<dt><a href="#BrownieAvailableContainers">BrownieAvailableContainers</a></dt>
<dd><p>Available containers that is known by brownie.
It is here instead of brownie since it is an integration thingy as well as avoiding circular dependencies.</p></dd>
</dl>

## Constants

<dl>
<dt><a href="#VERSION_CONSTANTS">VERSION_CONSTANTS</a></dt>
<dd><p>Version constants that is shared through multiple places.</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#eslintJson">eslintJson()</a></dt>
<dd><p>Default eslint configuration to inject to repository.</p></dd>
<dt><a href="#addGitTask">addGitTask(options)</a></dt>
<dd><p>Add a git init task to context to install the dependencies, ripped of from nx but it has the functionallity to chdir.</p></dd>
<dt><del><a href="#installWorkspaceDependencies">installWorkspaceDependencies()</a></del></dt>
<dd></dd>
<dt><a href="#addInstallTask">addInstallTask(options)</a></dt>
<dd><p>Add a install task to context to install the dependencies, ripped of from nx but it has the functionallity to chdir.</p></dd>
<dt><del><a href="#parseArguments">parseArguments(task, args, validArgs, options)</a></del></dt>
<dd></dd>
<dt><a href="#addSchematicTask">addSchematicTask(s, o)</a></dt>
<dd><p>Add a schematic task to run after the actions finish.</p></dd>
<dt><a href="#addExternalSchematicTask">addExternalSchematicTask(c, s, o)</a></dt>
<dd><p>Add a external schmatic task to run after the actions finish.</p></dd>
<dt><a href="#updateBrownieIntegration">updateBrownieIntegration(name, options)</a></dt>
<dd><p>Updates brownie integration by wiriting data to nx.json</p></dd>
<dt><a href="#readBrownieIntegration">readBrownieIntegration(name)</a></dt>
<dd><p>Returns the brownie integration part of the nx.json.</p></dd>
<dt><a href="#readBrownieContainers">readBrownieContainers()</a></dt>
<dd><p>Returns sum of brownie containers read from nx.json.</p></dd>
<dt><a href="#readMicroserviceIntegration">readMicroserviceIntegration()</a></dt>
<dd><p>Reads microservice integration part of the nx.json.</p></dd>
<dt><a href="#updateNxIntegration">updateNxIntegration(name, options)</a></dt>
<dd><p>Updates nx integration by saving values like prior configuration or so for having a memory.</p></dd>
<dt><a href="#readNxIntegration">readNxIntegration(name)</a></dt>
<dd><p>Returns the integration filed of nx.json.</p></dd>
<dt><a href="#readWorkspaceJson">readWorkspaceJson(name)</a></dt>
<dd><p>Returns the whole workspace.json for a given application.</p></dd>
<dt><a href="#updateTsconfigPaths">updateTsconfigPaths(options)</a></dt>
<dd><p>Updates tsconfig paths in the tsconfig.json</p></dd>
<dt><a href="#addEslintToTree">addEslintToTree(host, log, options, {{json:any}, })</a> ⇒</dt>
<dd><p>Adding eslint to workspace</p></dd>
<dt><a href="#createApplicationRule">createApplicationRule(appRule, options, ruleOptions)</a></dt>
<dd><p>Returns a general application rule that can be used in schematics.</p></dd>
<dt><a href="#formatOrSkip">formatOrSkip(log, skip, options)</a></dt>
<dd><p>Returns a general prettier-eslint format rule for schematics.</p></dd>
<dt><a href="#generateExportsRule">generateExportsRule(source, options, templatePath)</a></dt>
<dd><p>Generates from given template. Will search for multiple files that match the import case and will export them from root of the output file.</p></dd>
<dt><a href="#applyOverwriteWithDiff">applyOverwriteWithDiff(source, oldSource, context)</a></dt>
<dd><p>Given two sources, this will try to diff-merge prior and new configuration and apply it to current configuration.</p>
<p>If given one source, it will only apply what is missing from the current file and does not delete anything.</p>
<p>NX have a problem with its internal overwriting data mechanism so it is generated this way.</p></dd>
<dt><a href="#tripleFileMerge">tripleFileMerge(name, currentFile, oldFile, newFile, log)</a></dt>
<dd><p>Triple file merge will compare old with new file and apply the changes to the current file.</p></dd>
<dt><a href="#doubleFileMerge">doubleFileMerge(name, newFile, currentFile, log)</a></dt>
<dd><p>Double file merge only adds changes on the new file to the current file. No delete operation will be performed.</p></dd>
<dt><a href="#selectivePatch">selectivePatch(patch, select)</a></dt>
<dd><p>Selectively applies patches where you can define to only add or remove items.</p></dd>
<dt><a href="#replaceFirstChars">replaceFirstChars(str, from, to)</a></dt>
<dd><p>Required for parsing selective patchs in a string format.</p></dd>
<dt><a href="#mergeFiles">mergeFiles(host, file, mergedFiles, log)</a></dt>
<dd><p>Merges files the common part.</p></dd>
<dt><a href="#createFileBackup">createFileBackup(host, file, log)</a></dt>
<dd><p>Creates a file backup in tree.</p></dd>
<dt><a href="#runInRule">runInRule(run, condition)</a></dt>
<dd><p>Run something in a rule. It is just a empty function runs on condition. Just added to make everything look cleaner.</p></dd>
<dt><a href="#getJinjaDefaults">getJinjaDefaults(options)</a></dt>
<dd><p>Default settings for jinja compatible nunjucks.</p></dd>
<dt><a href="#jinjaTemplate">jinjaTemplate(ctx, options)</a></dt>
<dd><p>Generates jinja templates with given context.</p></dd>
<dt><a href="#multipleJinjaTemplate">multipleJinjaTemplate(ctx, options)</a></dt>
<dd><p>Generates multiple files from single template with dynamic context.</p></dd>
<dt><a href="#runBuilder">runBuilder(Builder)</a></dt>
<dd><p>Run a designated builder that is extended from base builder in NX way.</p></dd>
<dt><a href="#getWorkspace">getWorkspace(context, host)</a></dt>
<dd><p>Will return the workspace definition.</p></dd>
<dt><a href="#checkNodeModulesExists">checkNodeModulesExists(paths)</a></dt>
<dd><p>Check if file that is supposed to be executable is defined inside the node_modules folder.</p></dd>
<dt><a href="#getFilesInTree">getFilesInTree(tree, filter)</a></dt>
<dd><p>Will return the files in the given source tree applying the filters.</p></dd>
<dt><a href="#formatFiles">formatFiles(options)</a></dt>
<dd><p>Format files as a rule in a tree.</p>
<p>Requires configuration to be present in the current tree.</p>
<p>Will use prettier first, others after.</p></dd>
<dt><a href="#replaceExtension">replaceExtension(path, extension)</a></dt>
<dd><p>Replaces given extension.</p></dd>
<dt><a href="#removePathRoot">removePathRoot(filename, sourceRoot)</a></dt>
<dd><p>Removes the source root from the given path.</p></dd>
<dt><a href="#pipeProcessToLogger">pipeProcessToLogger(context, instance, options)</a></dt>
<dd><p>Given the instance it will pipe process output through the logger to append prefixes such as the application name.</p></dd>
<dt><a href="#createDependenciesForProjectFromGraph">createDependenciesForProjectFromGraph(graph, project)</a></dt>
<dd><p>Will create a dependency graph from nx project graph.</p></dd>
<dt><a href="#mergeDependencies">mergeDependencies(...dependenciesObjects)</a></dt>
<dd><p>Merge multiple set of dependencies together.</p></dd>
<dt><a href="#deepMerge">deepMerge(t, ...s)</a></dt>
<dd><p>Merge objects with defaults.</p>
<p>Mutates the object.</p></dd>
<dt><a href="#deepMergeWithUniqueMergeArray">deepMergeWithUniqueMergeArray(t, ...s)</a></dt>
<dd><p>Merge objects with array merge and filtering them uniquely.</p>
<p>Mutates the object.</p></dd>
<dt><a href="#deepMergeWithArrayOverwrite">deepMergeWithArrayOverwrite(t, ...s)</a></dt>
<dd><p>Merge objects with overwriting the target array with source array.</p>
<p>Mutates the object.</p></dd>
</dl>

<a name="BaseBuilder"></a>

## BaseBuilder
<p>Base builder for extending from.</p>

**Kind**: global class  
<a name="BaseBuilder+init"></a>

### baseBuilder.init()
<p>Initiate the builder first.</p>

**Kind**: instance method of [<code>BaseBuilder</code>](#BaseBuilder)  
<a name="Logger"></a>

## Logger
<p>A general logger that is wrapped around the angular-cli logger.</p>
<p>It is not great but winston was not working that well in a amazingly stateless architecture.</p>

**Kind**: global class  
<a name="ProcessManager"></a>

## ProcessManager
<p>Process manager is an instance where it tracks current child processes.abs</p>
<p>You can add long-living and short-living process to keep track of processes spawned by node.</p>

**Kind**: global class  

* [ProcessManager](#ProcessManager)
    * [.add()](#ProcessManager+add)
    * [.addPersistent()](#ProcessManager+addPersistent)
    * [.kill()](#ProcessManager+kill)
    * [.stop()](#ProcessManager+stop)
    * [.killProcesses()](#ProcessManager+killProcesses)

<a name="ProcessManager+add"></a>

### processManager.add()
<p>Add a new task that is killable.</p>

**Kind**: instance method of [<code>ProcessManager</code>](#ProcessManager)  
<a name="ProcessManager+addPersistent"></a>

### processManager.addPersistent()
<p>Add a persistent task that should not be killed until everything finishes.</p>

**Kind**: instance method of [<code>ProcessManager</code>](#ProcessManager)  
<a name="ProcessManager+kill"></a>

### processManager.kill()
<p>Kill all non-persistent tasks.</p>

**Kind**: instance method of [<code>ProcessManager</code>](#ProcessManager)  
<a name="ProcessManager+stop"></a>

### processManager.stop()
<p>Stop the processes compeletely.</p>

**Kind**: instance method of [<code>ProcessManager</code>](#ProcessManager)  
<a name="ProcessManager+killProcesses"></a>

### processManager.killProcesses()
<p>Tree kill proceseses.</p>

**Kind**: instance method of [<code>ProcessManager</code>](#ProcessManager)  
<a name="NxConstants"></a>

## NxConstants
<p>Some NX constants.
They seem to change every minor patch XD</p>

**Kind**: global variable  
<a name="NxConstants"></a>

## NxConstants
<p>Nx application types</p>

**Kind**: global variable  
<a name="BrownieAvailableContainers"></a>

## BrownieAvailableContainers
<p>Available containers that is known by brownie.
It is here instead of brownie since it is an integration thingy as well as avoiding circular dependencies.</p>

**Kind**: global variable  
<a name="VERSION_CONSTANTS"></a>

## VERSION\_CONSTANTS
<p>Version constants that is shared through multiple places.</p>

**Kind**: global constant  
<a name="eslintJson"></a>

## eslintJson()
<p>Default eslint configuration to inject to repository.</p>

**Kind**: global function  
<a name="addGitTask"></a>

## addGitTask(options)
<p>Add a git init task to context to install the dependencies, ripped of from nx but it has the functionallity to chdir.</p>

**Kind**: global function  

| Param |
| --- |
| options | 

<a name="installWorkspaceDependencies"></a>

## ~~installWorkspaceDependencies()~~
***Deprecated***

**Kind**: global function  
<a name="addInstallTask"></a>

## addInstallTask(options)
<p>Add a install task to context to install the dependencies, ripped of from nx but it has the functionallity to chdir.</p>

**Kind**: global function  

| Param |
| --- |
| options | 

<a name="parseArguments"></a>

## ~~parseArguments(task, args, validArgs, options)~~
***Deprecated***

**Kind**: global function  

| Param |
| --- |
| task | 
| args | 
| validArgs | 
| options | 

<a name="addSchematicTask"></a>

## addSchematicTask(s, o)
<p>Add a schematic task to run after the actions finish.</p>

**Kind**: global function  

| Param |
| --- |
| s | 
| o | 

<a name="addExternalSchematicTask"></a>

## addExternalSchematicTask(c, s, o)
<p>Add a external schmatic task to run after the actions finish.</p>

**Kind**: global function  

| Param |
| --- |
| c | 
| s | 
| o | 

<a name="updateBrownieIntegration"></a>

## updateBrownieIntegration(name, options)
<p>Updates brownie integration by wiriting data to nx.json</p>

**Kind**: global function  

| Param |
| --- |
| name | 
| options | 

<a name="readBrownieIntegration"></a>

## readBrownieIntegration(name)
<p>Returns the brownie integration part of the nx.json.</p>

**Kind**: global function  

| Param |
| --- |
| name | 

<a name="readBrownieContainers"></a>

## readBrownieContainers()
<p>Returns sum of brownie containers read from nx.json.</p>

**Kind**: global function  
<a name="readMicroserviceIntegration"></a>

## readMicroserviceIntegration()
<p>Reads microservice integration part of the nx.json.</p>

**Kind**: global function  
<a name="updateNxIntegration"></a>

## updateNxIntegration(name, options)
<p>Updates nx integration by saving values like prior configuration or so for having a memory.</p>

**Kind**: global function  

| Param |
| --- |
| name | 
| options | 

<a name="readNxIntegration"></a>

## readNxIntegration(name)
<p>Returns the integration filed of nx.json.</p>

**Kind**: global function  

| Param |
| --- |
| name | 

<a name="readWorkspaceJson"></a>

## readWorkspaceJson(name)
<p>Returns the whole workspace.json for a given application.</p>

**Kind**: global function  

| Param |
| --- |
| name | 

<a name="updateTsconfigPaths"></a>

## updateTsconfigPaths(options)
<p>Updates tsconfig paths in the tsconfig.json</p>

**Kind**: global function  

| Param |
| --- |
| options | 

<a name="addEslintToTree"></a>

## addEslintToTree(host, log, options, {{json:any}, }) ⇒
<p>Adding eslint to workspace</p>

**Kind**: global function  
**Returns**: <p>Rule</p>  

| Param | Type | Description |
| --- | --- | --- |
| host | <code>Tree</code> |  |
| log | [<code>Logger</code>](#Logger) |  |
| options | <code>T</code> |  |
| {{json:any} |  | <p>eslint</p> |
| } | <code>any</code> | <p>deps</p> |

<a name="createApplicationRule"></a>

## createApplicationRule(appRule, options, ruleOptions)
<p>Returns a general application rule that can be used in schematics.</p>

**Kind**: global function  

| Param |
| --- |
| appRule | 
| options | 
| ruleOptions | 

<a name="formatOrSkip"></a>

## formatOrSkip(log, skip, options)
<p>Returns a general prettier-eslint format rule for schematics.</p>

**Kind**: global function  

| Param |
| --- |
| log | 
| skip | 
| options | 

<a name="generateExportsRule"></a>

## generateExportsRule(source, options, templatePath)
<p>Generates from given template. Will search for multiple files that match the import case and will export them from root of the output file.</p>

**Kind**: global function  

| Param |
| --- |
| source | 
| options | 
| templatePath | 

<a name="applyOverwriteWithDiff"></a>

## applyOverwriteWithDiff(source, oldSource, context)
<p>Given two sources, this will try to diff-merge prior and new configuration and apply it to current configuration.</p>
<p>If given one source, it will only apply what is missing from the current file and does not delete anything.</p>
<p>NX have a problem with its internal overwriting data mechanism so it is generated this way.</p>

**Kind**: global function  

| Param |
| --- |
| source | 
| oldSource | 
| context | 

<a name="tripleFileMerge"></a>

## tripleFileMerge(name, currentFile, oldFile, newFile, log)
<p>Triple file merge will compare old with new file and apply the changes to the current file.</p>

**Kind**: global function  

| Param |
| --- |
| name | 
| currentFile | 
| oldFile | 
| newFile | 
| log | 

<a name="doubleFileMerge"></a>

## doubleFileMerge(name, newFile, currentFile, log)
<p>Double file merge only adds changes on the new file to the current file. No delete operation will be performed.</p>

**Kind**: global function  

| Param |
| --- |
| name | 
| newFile | 
| currentFile | 
| log | 

<a name="selectivePatch"></a>

## selectivePatch(patch, select)
<p>Selectively applies patches where you can define to only add or remove items.</p>

**Kind**: global function  

| Param |
| --- |
| patch | 
| select | 

<a name="replaceFirstChars"></a>

## replaceFirstChars(str, from, to)
<p>Required for parsing selective patchs in a string format.</p>

**Kind**: global function  

| Param |
| --- |
| str | 
| from | 
| to | 

<a name="mergeFiles"></a>

## mergeFiles(host, file, mergedFiles, log)
<p>Merges files the common part.</p>

**Kind**: global function  

| Param |
| --- |
| host | 
| file | 
| mergedFiles | 
| log | 

<a name="createFileBackup"></a>

## createFileBackup(host, file, log)
<p>Creates a file backup in tree.</p>

**Kind**: global function  

| Param |
| --- |
| host | 
| file | 
| log | 

<a name="runInRule"></a>

## runInRule(run, condition)
<p>Run something in a rule. It is just a empty function runs on condition. Just added to make everything look cleaner.</p>

**Kind**: global function  

| Param | Default |
| --- | --- |
| run |  | 
| condition | <code>true</code> | 

<a name="getJinjaDefaults"></a>

## getJinjaDefaults(options)
<p>Default settings for jinja compatible nunjucks.</p>

**Kind**: global function  

| Param |
| --- |
| options | 

<a name="jinjaTemplate"></a>

## jinjaTemplate(ctx, options)
<p>Generates jinja templates with given context.</p>

**Kind**: global function  

| Param |
| --- |
| ctx | 
| options | 

<a name="multipleJinjaTemplate"></a>

## multipleJinjaTemplate(ctx, options)
<p>Generates multiple files from single template with dynamic context.</p>

**Kind**: global function  

| Param |
| --- |
| ctx | 
| options | 

<a name="runBuilder"></a>

## runBuilder(Builder)
<p>Run a designated builder that is extended from base builder in NX way.</p>

**Kind**: global function  

| Param |
| --- |
| Builder | 

<a name="getWorkspace"></a>

## getWorkspace(context, host)
<p>Will return the workspace definition.</p>

**Kind**: global function  

| Param |
| --- |
| context | 
| host | 

<a name="checkNodeModulesExists"></a>

## checkNodeModulesExists(paths)
<p>Check if file that is supposed to be executable is defined inside the node_modules folder.</p>

**Kind**: global function  

| Param |
| --- |
| paths | 

<a name="getFilesInTree"></a>

## getFilesInTree(tree, filter)
<p>Will return the files in the given source tree applying the filters.</p>

**Kind**: global function  

| Param |
| --- |
| tree | 
| filter | 

<a name="formatFiles"></a>

## formatFiles(options)
<p>Format files as a rule in a tree.</p>
<p>Requires configuration to be present in the current tree.</p>
<p>Will use prettier first, others after.</p>

**Kind**: global function  

| Param |
| --- |
| options | 

<a name="replaceExtension"></a>

## replaceExtension(path, extension)
<p>Replaces given extension.</p>

**Kind**: global function  

| Param |
| --- |
| path | 
| extension | 

<a name="removePathRoot"></a>

## removePathRoot(filename, sourceRoot)
<p>Removes the source root from the given path.</p>

**Kind**: global function  

| Param |
| --- |
| filename | 
| sourceRoot | 

<a name="pipeProcessToLogger"></a>

## pipeProcessToLogger(context, instance, options)
<p>Given the instance it will pipe process output through the logger to append prefixes such as the application name.</p>

**Kind**: global function  

| Param |
| --- |
| context | 
| instance | 
| options | 

<a name="createDependenciesForProjectFromGraph"></a>

## createDependenciesForProjectFromGraph(graph, project)
<p>Will create a dependency graph from nx project graph.</p>

**Kind**: global function  

| Param |
| --- |
| graph | 
| project | 

<a name="mergeDependencies"></a>

## mergeDependencies(...dependenciesObjects)
<p>Merge multiple set of dependencies together.</p>

**Kind**: global function  

| Param |
| --- |
| ...dependenciesObjects | 

<a name="deepMerge"></a>

## deepMerge(t, ...s)
<p>Merge objects with defaults.</p>
<p>Mutates the object.</p>

**Kind**: global function  

| Param |
| --- |
| t | 
| ...s | 

<a name="deepMergeWithUniqueMergeArray"></a>

## deepMergeWithUniqueMergeArray(t, ...s)
<p>Merge objects with array merge and filtering them uniquely.</p>
<p>Mutates the object.</p>

**Kind**: global function  

| Param |
| --- |
| t | 
| ...s | 

<a name="deepMergeWithArrayOverwrite"></a>

## deepMergeWithArrayOverwrite(t, ...s)
<p>Merge objects with overwriting the target array with source array.</p>
<p>Mutates the object.</p>

**Kind**: global function  

| Param |
| --- |
| t | 
| ...s | 

