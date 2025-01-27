import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/vite/",
  build: {
    outDir: "dist",
  },
  plugins: [],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
