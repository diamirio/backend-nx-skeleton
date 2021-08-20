import { Repository } from 'typeorm'

export async function clear<T>(repository: Repository<T>): Promise<void> {
  const statement = `TRUNCATE TABLE "${repository.metadata.tableName}" CASCADE;`
  await repository.query(statement)
}
