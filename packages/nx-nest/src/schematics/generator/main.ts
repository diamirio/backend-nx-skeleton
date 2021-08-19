import { generateGenericGenerator } from '@webundsoehne/nx-tools/dist/schematics/generator/main'
import { join } from 'path'

/**
 * @param  {Schema} schema
 * The schematic itself.
 */
export default generateGenericGenerator(join(__dirname, './files'))
