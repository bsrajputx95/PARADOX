module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
  rules: {
    'no-unused-vars': 'off',
  },
};
