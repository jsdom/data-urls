import domenicConfig from "@domenic/eslint-config";
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node
    }
  },
  ...domenicConfig,
  {
    files: ["scripts/**.js"],
    rules: {
      "no-process-env": "off",
      "no-process-exit": "off",
      "no-console": "off"
    }
  }
];
