import type { Component } from '../../constant/application'

export interface ResourceGeneratorSchema {
  name: string
  project?: string
  component: Component
}
