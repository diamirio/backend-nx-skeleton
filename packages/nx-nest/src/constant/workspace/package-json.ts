/* eslint-disable @typescript-eslint/naming-convention */
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
  lint: 'npm run lint:check -- --fix',
  'lint:check': 'nx run-many --parallel 10 --target lint --',
  update: 'nx migrate latest'
}

export const CUSTOM_FIELDS = {
  'simple-git-hooks': {
    'pre-commit': 'npm exec lint-staged'
  }
}
