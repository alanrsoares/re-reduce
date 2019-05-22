module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "@typescript-eslint/no-explicit-any": false,
    "@typescript-eslint/explicit-function-return-type": false,
  },
};
