/* eslint-disable @typescript-eslint/naming-convention */
export const DEPENDENCIES = {}

export const DEV_DEPENDENCIES = {
  '@nx/eslint': '^19.3.0',
  '@nx/eslint-plugin': '^19.3.0',
  '@nx/workspace': '^19.3.0',
  '@typescript-eslint/eslint-plugin': '7.14.1',
  '@typescript-eslint/parser': '7.14.1',
  '@webundsoehne/eslint-config': '^6',
  eslint: '^8',
  'eslint-config-prettier': '9.1.0',
  'eslint-module-utils': '^2',
  'eslint-plugin-import': '^2',
  'lint-staged': '^13',
  nx: '^19.3.0',
  prettier: '^2.7.1',
  'simple-git-hooks': '^2',
  'ts-node': '^10',
  'ts-node-dev': '^2',
  'ts-patch': '^3',
  typescript: '^5',
  'typescript-transform-paths': '^3'
}

export const SCRIPTS = {
  nx: 'nx',
  prepare: 'ts-patch install -s',
  start: 'nx run-many --target serve --parallel 1000',
  'start:one': 'nx serve',
  build: 'nx run-many --target build',
  'build:one': 'nx build',
  'build:nocache': 'npm run build -- --skip-nx-cache',
  test: 'nx run-many --target test --parallel 10',
  'test:one': 'nx test --project',
  'test:e2e': 'nx run-many --target test -c e2e --parallel 10',
  'test:e2e:one': 'nx test -c e2e --project',
  'test:cov': 'nx run-many --target test -c cov --parallel 10',
  'test:cov:one': 'nx test -c cov --project',
  lint: 'nx format:write && nx workspace-lint && npm run lint:check -- --fix',
  'lint:check': 'nx run-many --parallel 10 --target lint --',
  affected: 'nx affected',
  'affected:apps': 'nx affected:apps',
  'affected:libs': 'nx affected:libs',
  'affected:build': 'nx affected:build',
  'affected:test': 'nx affected:test',
  'affected:lint': 'nx affected:lint --base=$(git branch --show-current) --parallel 10 --fix',
  'affected:dep-graph': 'nx affected:dep-graph',
  update: 'nx migrate latest',
  'dep-graph': 'nx graph',
  clean: 'rimraf dist/ .cache/ node_modules/ yarn.lock yarn-error.log package-lock.json',
  'backend:command:one': 'nx command',
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

export const CUSTOM_FIELDS = {
  'simple-git-hooks': {
    'pre-commit': 'npm exec lint-staged'
  }
}
/* eslint-enable */
