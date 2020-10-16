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
    Vue: true,
    App: true,
    Swiper: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    // https://eslint.org/docs/rules/rest-spread-spacing
    // error  Parsing error: Unexpected token ..
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/essential',
    'standard'
    // 'plugin:react/recommended',
    // 'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'space-before-function-paren': 0,
    // 'brace-style': [2, 'stroustrup', { allowSingleLine: true }],
    'brace-style': 0
  }
}
