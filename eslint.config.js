const prettierPlugin = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

// @typescript-eslint/eslint-plugin exposes `configs.recommended` as either a
// flat config array or a legacy `{ rules }` object depending on version.
const tsRecommended = tsPlugin.configs.recommended;
const tsRecommendedRules = Array.isArray(tsRecommended)
  ? Object.assign({}, ...tsRecommended.map((config) => config.rules || {}))
  : tsRecommended.rules;

module.exports = [
  {
    ignores: ["dist/**", "build/**", "test-results/**", "coverage/**"],
  },
  {
    plugins: {
      prettier: prettierPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      camelcase: "off",
      "react/jsx-filename-extension": "off",
      "react/jsx-props-no-spreading": "off",
      "react/no-unused-prop-types": "off",
      "react/require-default-props": "off",
      quotes: "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...tsRecommendedRules,
      ...prettierConfig.rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "omit" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-use-before-define": [0],
      "@typescript-eslint/no-use-before-define": [1],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true },
      ],
    },
  },
];
