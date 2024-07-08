import type { Tree } from '@nx/devkit'
import type { ExportDeclarationStructure, OptionalKind, SourceFile } from 'ts-morph'
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

  if (!enumNode) {
    return
  }

  enumNode.addMember({ name, value })
}

export function addClassProperty (file: SourceFile, className: string, name: string, type: string): void {
  const classNode = file.getClass(className)

  if (!classNode) {
    return
  }

  classNode.addProperty({ name, type })
}

export function addIndexExport (file: SourceFile, modulePath: string, exportItems?: string[]): void {
  const exportStructure: OptionalKind<ExportDeclarationStructure> = { moduleSpecifier: modulePath }

  if (exportItems?.length) {
    exportStructure.namedExports = exportItems
  }

  file.addExportDeclaration(exportStructure)
}

export function addImport (file: SourceFile, importValue: string, importPath: string): void {
  const importNode = file.getImportDeclaration((i) => i.getModuleSpecifier().getLiteralValue() === importPath)

  if (!importNode) {
    file.addImportDeclaration({ moduleSpecifier: importPath, namedImports: [importValue] })
  } else {
    importNode.addNamedImport(importValue)
  }
}
