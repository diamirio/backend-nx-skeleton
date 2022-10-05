import type { GeneratedNameCases } from '@webundsoehne/nx-tools'

export interface GeneratedMicroserviceCasing {
  name: string
  casing: GeneratedNameCases
  names: Record<'queue' | 'file' | 'pattern' | 'interface', string>
}
