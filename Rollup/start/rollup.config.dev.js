import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import htmlTemplate from "rollup-plugin-generate-html-template";
import clear from 'rollup-plugin-clear'

export default defineConfig({
  input: "src/index.js",
  output: {
    // file: "dist/bundle.js",
    dir: "dist/",
    format: "esm",
    manualChunks: {
      dayjs: ["dayjs"],
    },
  },
  // external: ["dayjs"],
  // 插件执行顺序是正常遍历执行
  plugins: [
    resolve(),
    commonjs(),
    babel({
      // babelHelpers: "bundled"
      babelHelpers: "runtime",
      include: ["src/**"], // babel转化包含的文件
      exclude: ["node_modules/**"], // babel转化排除的文件
      extensions: [".js", ".ts"], // 转化的文件扩展名
    }),
    clear({
      targets: ['dist'],
    }),
    htmlTemplate({
      template: "public/index.html",
      target: "dist/index.html",
    })
  ],
});
