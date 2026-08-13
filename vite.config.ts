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
    react(),
    svgr({
      svgrOptions: {
        titleProp: true,
      },
    }),
  ],
  root,
  build: {
    outDir,
    // dist is outside of `root` (src); don't empty it here so the header and
    // footer builds' output isn't wiped out by this later step in the chain.
    emptyOutDir: false,
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
