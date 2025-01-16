import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import typescriptParser from '@typescript-eslint/parser'

export default {
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  languageOptions: {
    parser: typescriptParser,
    parserOptions: { project: true },
  },
  plugins: {
    '@typescript-eslint': typescriptPlugin,
    prettier: prettierPlugin,
  },
  rules: {
    "no-underscore-dangle": 0,
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
    ],
    "prettier/prettier": [
      "error",
      {
        "printWidth": 100
      }
    ],
    "import/prefer-default-export": 0,
    "import/extensions": "off",
    "no-param-reassign": [
      "error",
      { "props": true, "ignorePropertyModificationsFor": ["request", "reply"] }
    ],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "no-unexpected-multiline": "error",
  },
  files: ['src/**/*.js', 'src/**/*.ts'],
  ignores: [
    'src/graphql/nexus-typegen.d.ts',
  ],
}
