module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['@stylistic/js'],
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'], // airbnb wants semicollons, disabling it for extra points...
    '@stylistic/js/indent': ['error', 2],
    '@stylistic/js/semi': ['error', 'never'],
  },
}
