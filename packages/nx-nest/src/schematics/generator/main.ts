import { join } from 'path'

import { generateGenericGenerator } from '@webundsoehne/nx-tools/dist/schematics/generator/main'

/**
 * @param  {Schema} schema
 * The schematic itself.
 */
export default generateGenericGenerator(join(__dirname, './files'))
