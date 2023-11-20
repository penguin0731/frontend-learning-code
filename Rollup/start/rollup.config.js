// 多入口多产物配置
import { defineConfig } from "rollup";

const buildIndexOptions = defineConfig({
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "esm",
  },
});

const buildMainOptions = defineConfig({
  input: "src/main.js",
  output: {
    file: "dist/main.js",
    format: "esm",
  },
});

export default [buildIndexOptions, buildMainOptions];
