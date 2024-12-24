/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@raulscoelho/eslint-config/next'],
  rules: {
    'react/no-unescaped-entities': 'off',
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
}
