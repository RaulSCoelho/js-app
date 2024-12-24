/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@raulscoelho/eslint-config/node'],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "camelcase": "off"
  },
}
