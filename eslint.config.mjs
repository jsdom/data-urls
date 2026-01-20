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
  {
    files: ["**/*.mjs"],
    languageOptions: {
      sourceType: "module",
      globals: globals.node
    }
  },
  ...domenicConfig
];
