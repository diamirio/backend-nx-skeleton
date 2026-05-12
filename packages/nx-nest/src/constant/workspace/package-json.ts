export const SCRIPTS = {
  nx: 'nx',
  prepare: 'ts-patch install -s',
  start: 'nx run-many --target serve --parallel 100 --batch',
  'start:one': 'nx serve',
  build: 'nx run-many --target build --batch',
  'build:one': 'nx build',
  'build:nocache': 'npm run build -- --skip-nx-cache',
  lint: 'npm run lint:check',
  'lint:check': 'nx run-many --parallel 10 --target lint --',
  'lint:fix': 'nx run-many --parallel 10 --target lint -- --fix',
  update: 'nx migrate latest'
}

export const CUSTOM_FIELDS = {
  'simple-git-hooks': {
    'pre-commit': 'npm exec lint-staged'
  }
}
