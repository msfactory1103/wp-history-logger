@echo off
title Start WordPress Dev: Site A
echo === Starting browser-sync on port 3000 ===
start cmd /k "npm run dev-a"

timeout /t 1 >nul

echo === Starting watcher.js ===
start cmd /k "npm run watcher"

echo ✅ All systems go. Close this window if you're done.
pause
