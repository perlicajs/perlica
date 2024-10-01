import tslint      from "typescript-eslint";
import stylistic   from "@stylistic/eslint-plugin";
import alignImport from "eslint-plugin-align-import";

export default tslint.config(
  ...tslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project:         true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  stylistic.configs.customize({
    indent:       2,
    quotes:       "double",
    semi:         true,
    braceStyle:   "1tbs",
    blockSpacing: true,
    quoteProps:   "as-needed",
    commaDangle:  "always-multiline",
  }),
  {
    plugins: {
      "align-import": alignImport,
    },
    rules: {
      "@stylistic/max-len":         ["error", { code: 100 }],
      "@stylistic/arrow-parens":    ["error", "as-needed"],
      "@stylistic/key-spacing":     ["error", { mode: "minimum", align: "value" }],
      "@stylistic/no-multi-spaces": ["off"],

      "align-import/align-import": ["error"],

      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-unused-vars":               [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
);
