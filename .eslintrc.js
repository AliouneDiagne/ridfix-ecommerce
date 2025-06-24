module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2024,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es2024: true,
    node: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@eslint/js",
    "prettier"
  ],
  plugins: [
    "react",
    "react-hooks",
    "eslint-plugin-react-refresh"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    // Consistenza JSX
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

    // Best practices
    "eqeqeq": ["error", "always"],
    "no-console": ["warn", { allow: ["warn", "error"] }],

    // React Hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": ["warn"],

    // Codice pulito
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],

    // Disabilita alcune regole TS (non usi TS)
    "@typescript-eslint/no-unused-vars": "off"
  }
}
