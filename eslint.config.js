import tslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default tslint.config(
  ...tslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  stylistic.configs.customize({
    indent: 2,
    quotes: "double",
    semi: true,
    braceStyle: "1tbs",
    blockSpacing: true,
    quoteProps: "as-needed",
    commaDangle: "always-multiline",
  }),
  {
    rules: {
      "@stylistic/arrow-parens": ["error", "as-needed"],
      "@typescript-eslint/no-confusing-void-expression": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
);
