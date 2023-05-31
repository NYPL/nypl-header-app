import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import { viteSingleFile } from "vite-plugin-singlefile";

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
    // viteSingleFile(),
  ],
  root,
  build: {
    outDir,
    // emptyOutDir: true,
    rollupOptions: {
      input: {
        // ".": resolve(root, "index.html"),
        // header: resolve(root, "header", "index.html"),
        // footer: resolve(root, "footer", "index.html"),
        // "header.min": resolve(root, "header", "main.tsx"),
        "footer.min": resolve(root, "footer", "main.tsx"),
      },
      output: {
        format: "iife",
        // manualChunks: undefined,
        entryFileNames: "[name].js",
        // inlineDynamicImports: true,
        // assetFileNames: "[name].[ext]", // currently does not work for images
      },
      // plugins: [
      //   {
      //     name: "wrap-in-iife",
      //     generateBundle(outputOptions, bundle) {
      //       Object.keys(bundle).forEach((fileName) => {
      //         const file = bundle[fileName];
      //         if (fileName.slice(-3) === ".js" && "code" in file) {
      //           file.code = `(() => {\n${file.code}})()`;
      //         }
      //       });
      //     },
      //   },
      // ],
    },
  },
});
