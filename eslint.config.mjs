import nextConfig from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import security from "eslint-plugin-security";
import noUnsanitized from "eslint-plugin-no-unsanitized";

const eslintConfig = [
  ...nextConfig,
  ...nextTypeScript,
  security.configs.recommended,
  noUnsanitized.configs.recommended,
  {
    ignores: [
      "tailwind.config.js",
      "jest.config.js",
      "scripts/patch-eslint-react.js"
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
  },
  {
    // Build-time content loaders read from a fixed, repo-local directory
    // (no untrusted input reaches these paths on a statically-exported site),
    // and array-index access here is not user-controlled object injection.
    files: ["src/lib/get*.ts", "**/__tests__/**"],
    rules: {
      "security/detect-non-literal-fs-filename": "off",
      "security/detect-object-injection": "off",
    },
  },
];

export default eslintConfig;
