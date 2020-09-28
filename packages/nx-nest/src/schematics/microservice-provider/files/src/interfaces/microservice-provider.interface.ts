export interface MicroserviceProviderChild {
  request: Record<string, any> | never
  response: Record<string, any> | never
}
