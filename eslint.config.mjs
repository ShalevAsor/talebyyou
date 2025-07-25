import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["src/generated/**"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add import plugin
  ...compat.extends("plugin:import/recommended", "plugin:import/typescript"),

  {
    rules: {
      "react/no-unescaped-entities": [
        "error",
        {
          forbid: [">", "}"], // Only forbid > and }, allow apostrophes
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Import organization rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js built-ins
            "external", // npm packages
            "internal", // Your app code (@/)
            "parent", // ../
            "sibling", // ./
            "index", // ./index
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",
    },
  },
];

export default eslintConfig;
