import { TypeormLoaderExtensionInput } from './typorm-loader.interface'
import { TYPEORM_DATALOADER_EXTENSION_FIELD } from '@constants/extension-field.constants'

export interface Extensions {
  [key: string]: any

  [TYPEORM_DATALOADER_EXTENSION_FIELD]: {
    args: TypeormLoaderExtensionInput
    key: string | symbol
    // eslint-disable-next-line @typescript-eslint/ban-types
    target: Function | object
  }
}
