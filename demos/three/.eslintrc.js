/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-13 20:46
 */
module.exports = {
  env: {
    browser: true,
    node: true
  },
  globals: {
    THREE: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    // https://eslint.org/docs/rules/rest-spread-spacing
    // error  Parsing error: Unexpected token ..
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  plugins: [],
  rules: {
    'space-before-function-paren': 0,
    // 'brace-style': [2, 'stroustrup', { allowSingleLine: true }],
    'brace-style': 0
  }
}
