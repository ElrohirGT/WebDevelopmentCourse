// eslint.config.js
import stylisticJs from '@stylistic/eslint-plugin-js'
import airbnb from 'eslint-config-airbnb-base'

export default [
  {
    plugins: {
      '@stylistic/js': stylisticJs,
      '@airbnb': airbnb,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/semi': ['error', 'never'],
    }
  }
]
