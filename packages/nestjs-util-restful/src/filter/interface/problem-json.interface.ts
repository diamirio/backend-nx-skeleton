export interface ProblemJson {
  [key: string]: any
  type: string
  title: string
  status?: number
  detail?: string
  instance?: string
}
