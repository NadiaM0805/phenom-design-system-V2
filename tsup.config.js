const { defineConfig } = require("tsup");

module.exports = defineConfig({
  entry: ["src/index.jsx"],
  format: ["cjs", "esm"],
  sourcemap: false,
  clean: true,
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs" : ".mjs" };
  }
});

