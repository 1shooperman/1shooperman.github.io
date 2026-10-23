import nextConfig from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import security from "eslint-plugin-security";
import noUnsanitized from "eslint-plugin-no-unsanitized";

const eslintConfig = [
  ...nextConfig,
  ...nextTypeScript,
  {
    ignores: [
      "tailwind.config.js",
      "jest.config.js"
    ],
  },
  {
    plugins: {
      security,
      "no-unsanitized": noUnsanitized,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      ...security.configs.recommended.rules,
      ...noUnsanitized.configs.recommended.rules,
      // This is a static-export site: all fs reads/object indexing target the
      // repo's own content directories at build time, never user input, so
      // these two detectors only produce false positives here.
      "security/detect-non-literal-fs-filename": "off",
      "security/detect-object-injection": "off",
    },
  },
];

export default eslintConfig;
