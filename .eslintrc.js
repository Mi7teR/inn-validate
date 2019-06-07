module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: './'
  },
  rules: {
    "indent": "off",
    "@typescript-eslint/indent": ["error", 2]
  },
  settings: {
    "import/extensions": [".ts"],
    "import/resolver": {
      "node": {
        "extensions": [".ts"]
      }
    },
  }
};