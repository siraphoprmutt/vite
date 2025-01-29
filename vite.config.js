import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import fs from "fs";
import { resolve, relative } from "path";

const projectRoot = resolve(__dirname);
const distDir = resolve(__dirname, "dist");
const entries = {};

// ✅ ลบ dist เฉพาะตอน build เท่านั้น
if (process.argv.includes("build") && fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
  console.log("🗑️ Removed existing dist folder (before build)");
}

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
  base: "/vite/",
  plugins: [Inspect()],
  build: {
    outDir: "dist",
    emptyOutDir: true, // ✅ ให้ Vite ลบ dist อัตโนมัติ
    assetsDir: "assets",
    rollupOptions: {
      input: entries,
    },
  },
  preview: {
    port: 5000,
    strictPort: true,
  },
});
