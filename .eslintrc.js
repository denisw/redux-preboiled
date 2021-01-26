module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  env: {
    jest: true,
  },
  overrides: [
    {
      files: ['.eslintrc.js', 'babel.config.js'],
      env: {
        commonjs: true,
      },
    },
  ],
}
