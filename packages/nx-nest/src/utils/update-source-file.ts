import type { Tree } from '@nx/devkit'
import type { SourceFile } from 'ts-morph'
import { Project } from 'ts-morph'

export function updateSourceFile (tree: Tree, filePath: string, fileAction: (fileNode: SourceFile) => void): void {
  if (!tree.exists(filePath)) {
    return
  }

  const morphProject = new Project()
  const fileContent = tree.read(filePath).toString()
  const fileNode = morphProject.addSourceFileAtPathIfExists(filePath) ?? morphProject.createSourceFile(filePath, fileContent)

  if (!fileNode) {
    return
  }

  fileAction(fileNode)

  const newFileContent = fileNode.getSourceFile().getFullText()

  if (fileContent !== newFileContent) {
    tree.write(filePath, newFileContent)
  }
}

export function addEnumMember (file: SourceFile, enumName: string, name: string, value: string | number): void {
  const enumNode = file.getEnum(enumName)

  if (!enumNode || !!enumNode.getMember(name)) {
    return
  }

  enumNode.addMember({ name, value })
}

export function addClassProperty (file: SourceFile, className: string, name: string, type: string): void {
  const classNode = file.getClass(className)

  if (!classNode || !!classNode.getProperty(name)) {
    return
  }

  classNode.addProperty({ name, type })
}

export function addIndexExport (file: SourceFile, modulePath: string): void {
  const moduleExport = file.getExportDeclaration(modulePath)

  if (!moduleExport) {
    file.addExportDeclaration({ moduleSpecifier: modulePath })
  }
}

export function addExport (file: SourceFile, importValue: string, importPath: string): void {
  const exportNode = file.getExportDeclaration(importPath)

  if (!exportNode) {
    file.addExportDeclaration({ moduleSpecifier: importPath, namedExports: [importValue] })
  } else if (!exportNode.getNamedExports().find((i) => i.getName() === importValue)) {
    exportNode.addNamedExport(importValue)
  }
}

export function addImport (file: SourceFile, importValue: string, importPath: string): void {
  const importNode = file.getImportDeclaration(importPath)

  if (!importNode) {
    file.addImportDeclaration({ moduleSpecifier: importPath, namedImports: [importValue] })
  } else if (!importNode.getNamedImports().find((i) => i.getName() === importValue)) {
    importNode.addNamedImport(importValue)
  }
}
