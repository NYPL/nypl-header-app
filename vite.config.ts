import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
    })
  ],
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ".": resolve(root, "index.html"),
        header: resolve(root, "header", "index.html"),
        footer: resolve(root, "footer", "index.html"),
        "header.min": resolve(root, "header", "main.tsx"),
        "footer-latest": resolve(root, "footer", "main.tsx"),
      },
      output: {
        entryFileNames: "[name].js",
      }
    },
  },
});