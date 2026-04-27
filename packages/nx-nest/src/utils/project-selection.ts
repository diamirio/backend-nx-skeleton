import { prompt } from 'enquirer'

export interface ProjectChoice {
  name: string
  value: string
}

export async function selectProjectByAutocomplete(
  projects: ProjectChoice[],
  message: string = 'Please select a project:'
): Promise<string | null> {
  if (!projects || projects.length === 0) {
    return null
  }

  const result = await prompt<{ project: string }>({
    type: 'autocomplete',
    name: 'project',
    message,
    choices: projects
  })

  return result.project ?? null
}
