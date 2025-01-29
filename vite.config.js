import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import { resolve, relative } from "path";
import fs from "fs";

const projectRoot = resolve(__dirname);
const distDir = resolve(__dirname, "dist");
const entries = {};

// ✅ ค้นหา index.html ในโฟลเดอร์หลัก
fs.readdirSync(projectRoot, { withFileTypes: true }).forEach((dirent) => {
  if (dirent.isDirectory()) {
    const folderName = dirent.name;
    const htmlFile = resolve(projectRoot, folderName, "index.html");

    if (fs.existsSync(htmlFile)) {
      entries[folderName] = relative(projectRoot, htmlFile).replace(/\\/g, "/");
    }
  }
});

// ✅ เพิ่ม index.html หลัก
entries["index"] = "index.html";

console.log("✅ Generated Pages:", entries);

export default defineConfig({
  base: "/vite/", // ✅ เปลี่ยน base ให้ตรงกับ GitHub Repo
  plugins: [Inspect()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: entries,
    },
  },
  preview: {
    port: 5000,
    strictPort: true,
  },
});
