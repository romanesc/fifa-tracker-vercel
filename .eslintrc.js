module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "off"
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint']
}