import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
/// <reference types="vitest" />
export default defineConfig({
  plugins: [react(), svgr()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@images": path.resolve(__dirname, "./src/images"),
      "@partials": path.resolve(__dirname, "./src/partials"),
    },
  },
});
