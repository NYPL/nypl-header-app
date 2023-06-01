import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

// This is a separate Vite config file for the Footer. This is done because
// we want the /footer.min.js endpoint to contain all the code for the Footer
// and Vite does not allow a single file when multiple entry points are set.
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
    rollupOptions: {
      input: {
        "footer.min": resolve(root, "footer", "main.tsx"),
      },
      output: {
        entryFileNames: "[name].js",
        // ESM is not supported everywhere yet for various reasons, so build
        // the bundle in IIFE (Immediately Invoked Function Expression)
        // format. The entire file will be wrapped in a single function call
        // that will be executed as soon as the browser downloads the bundle.
        format: "iife",
      },
    },
  },
});
