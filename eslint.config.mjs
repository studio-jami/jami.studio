import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
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
