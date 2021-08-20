import { Document } from 'mongoose'

export class BaseDocument extends Document<string, any> {
  id!: string
}
