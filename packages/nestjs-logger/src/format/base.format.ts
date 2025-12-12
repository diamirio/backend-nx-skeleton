import { format } from 'winston'

import { Format } from '../interface/winston.interface'

export const BaseFormat: Format = format.combine(format.timestamp(), format.splat())
