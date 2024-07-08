/* eslint-disable @typescript-eslint/naming-convention */
export const SCRIPTS = {
  'backend:seed': 'nx run-many --target seed --parallel',
  'backend:seed:one': 'nx seed',
  'backend:migrate': 'nx run-many --target migration -c run --parallel',
  'backend:migrate:one': 'nx migration -c run',
  'backend:migrate:mock': 'nx run-many --target migration -c mock-run --parallel',
  'backend:migrate:mock:one': 'nx migration -c mock-run',
  'backend:migrate:rollback': 'nx run-many --target migration -c rollback --parallel',
  'backend:migrate:rollback:one': 'nx migration -c rollback',
  'backend:migrations:create:one': 'nx migration -c create',
  'backend:migrations:generate:one': 'nx migration -c generate'
}
