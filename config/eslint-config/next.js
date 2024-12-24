/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@raulscoelho/eslint-config/next', "next/core-web-vitals"],
  rules: {
    'react/no-unescaped-entities': 'off',
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
}
