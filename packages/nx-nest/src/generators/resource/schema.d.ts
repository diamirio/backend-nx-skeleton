import type { Component } from '../../constant'

export interface ResourceGeneratorSchema {
  name: string
  project?: string
  component: Component
}
