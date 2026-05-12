import { format } from 'winston'

import { Format } from '../interface/winston.interface'
import { BaseFormat } from './base.format'

export const JsonFormat: Format = format.combine(BaseFormat, format.json())
