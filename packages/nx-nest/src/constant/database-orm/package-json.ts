/* eslint-disable @typescript-eslint/naming-convention */
export const SCRIPTS = {
  seed: 'nx run-many --target seed --parallel',
  'seed:one': 'nx seed',
  migrate: 'nx run-many --target migration -c run --parallel',
  'migrate:one': 'nx migration -c run',
  'migrate:rollback': 'nx run-many --target migration -c rollback --parallel',
  'migrate:rollback:one': 'nx migration -c rollback',
  'migrations:create:one': 'nx migration -c create',
  'migrations:generate:one': 'nx migration -c generate'
}
