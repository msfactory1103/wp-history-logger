const chokidar = require("chokidar");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("📡 watcher 起動中...");

const filePath = path.resolve(__dirname, "./contents/about.html");

const watcher = chokidar.watch(filePath, {
  persistent: true,
  ignoreInitial: true,
  usePolling: true,
  interval: 500,
  awaitWriteFinish: {
    stabilityThreshold: 500,
    pollInterval: 100
  }
});

watcher.on("change", (file) => {
  console.log(`✅ 変更検知: ${file}`);
  exec(`node log-content.js "${file}"`, (err, stdout, stderr) => {
    console.log("📤 log-content.js 実行ログ:", stdout);
    if (stderr) console.error("stderr:", stderr);
    if (err) console.error("❌ 実行エラー:", err);
    fs.writeFileSync("./contents/.trigger", `updated at ${new Date()}`);
  });
});
