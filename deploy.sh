#!/usr/bin/env sh

# หยุด script เมื่อเกิด error
set -e

# สร้างไฟล์ build
npm run build

# ไปที่โฟลเดอร์ dist
cd dist

# สร้างไฟล์ .nojekyll เพื่อให้ GitHub Pages รู้ว่าต้องเสิร์ฟไฟล์ static
echo > .nojekyll

# ตั้งค่า Git และ Deploy ไปที่ GitHub Pages
git init
git checkout -B gh-pages
git add -A
git commit -m "Deploy to GitHub Pages"

# แทนที่ YOUR_GITHUB_USERNAME และ YOUR_REPO_NAME
git push -f https://github.com/siraphoprmutt/vite.git gh-pages

cd -
