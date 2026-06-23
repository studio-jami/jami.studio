import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    // Pin the React version for eslint-plugin-react. Its default "detect" mode
    // walks the filesystem via context.getFilename(), which ESLint 10 removed —
    // crashing the lint run. An explicit version skips detection entirely (also
    // the recommended posture) and keeps the lint gate green under ESLint 10.
    settings: {
      react: {
        version: "19.2"
      }
    }
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "references/**",
      "yrka/**",
      "_legacy/**",
      "docs/reports/**",
      "docs/research/**",
      "coverage/**",
      "dist/**"
    ]
  }
];

export default eslintConfig;
