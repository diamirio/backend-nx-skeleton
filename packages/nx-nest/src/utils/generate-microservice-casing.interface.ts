import { GeneratedNameCases } from '@webundsoehne/nx-tools'

export interface GeneratedMicroserviceCasing {
  name: string
  casing: GeneratedNameCases
  names: Record<'queue' | 'client' | 'file' | 'pattern' | 'interface', string>
}
