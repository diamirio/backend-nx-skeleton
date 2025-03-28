import type { Tree } from '@nx/devkit'
import { getProjects } from '@nx/devkit'
import { prompt } from 'enquirer'

import { Database } from '../constant'

export async function promptDatabase (): Promise<Database> {
  return (
    await prompt<{ database?: Database }>({
      type: 'autocomplete',
      name: 'database',
      message: 'Please select a database:',
      choices: [Database.MYSQL, Database.POSTGRES, Database.OTHER]
    })
  ).database
}

export async function promptProjectRootMultiselect (tree: Tree, message: string): Promise<string[]> {
  const projects = getProjects(tree)
  const applications = []
  let selectedProjects = []

  for (const project of projects.values()) {
    if (project.projectType === 'application') {
      applications.push({ name: project.name, value: project.name })
    }
  }

  if (applications.length) {
    const projectApplications = (
      await prompt<{ projects: string[] }>({
        type: 'multiselect',
        name: 'projects',
        message,
        choices: applications
      })
    ).projects

    selectedProjects = projectApplications?.map((application) => projects.get(application)?.root)?.filter((application) => !!application)
  }

  return selectedProjects
}
