import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

module.exports = defineConfig({
  server: {
    host: true, // for Docker Container port mapping
  },
  plugins: [
    svgr({
      svgrOptions: {
        titleProp: true,
      },
    }),
    react(),
  ],
  root,
  build: {
    outDir,
    rollupOptions: {
      input: {
        ".": resolve(root, "index.html"),
        header: resolve(root, "header", "index.html"),
        footer: resolve(root, "footer", "index.html"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
