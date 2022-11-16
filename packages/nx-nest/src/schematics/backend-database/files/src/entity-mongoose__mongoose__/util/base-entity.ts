import { Document } from 'mongoose'

export class BaseDocument extends Document<string, any> {
  // @ts-ignore
  id: string
}
