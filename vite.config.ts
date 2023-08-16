import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist/client");

export default defineConfig({
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
    rollupOptions: {
      input: {
        header: resolve(root, "header", "index.html"),
        footer: resolve(root, "footer", "index.html"),
        ".": resolve(root, "index.html"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
