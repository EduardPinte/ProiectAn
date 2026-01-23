import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

import pluginPrettier from "eslint-plugin-prettier";

export default defineConfig([
  // Ignore paths
  {
    ignores: [
      "dist/**",
      "dev-dist/**",
      ".pnp.*",
      ".yarn/**",
      "node_modules/**"
    ]
  },

  // JavaScript + Vue base rules
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      sourceType: "module",
      globals: globals.browser
    },
    rules: {
      "no-alert": "error"
    }
  },

  // Vue essential rules (flat config compatible)
  ...pluginVue.configs["flat/essential"].map(config => ({
    ...config,
    files: ["**/*.vue"]
  })),

  // JSON
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"]
  },

  // JSONC
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"]
  },

  // JSON5
  {
    files: ["**/*.json5"],
    plugins: { json },
    language: "json/json5",
    extends: ["json/recommended"]
  },

  // Markdown
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/commonmark",
    extends: ["markdown/recommended"]
  },

  // CSS
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"]
  },

  // Prettier (FIX IMPORTANT)
  {
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      "prettier/prettier": "error"
    }
  }
]);
