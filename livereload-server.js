// livereload-server.js
const livereload = require("livereload");
const server = livereload.createServer({
  exts: ["html", "js", "css"],
});
server.watch(__dirname + "/contents");
console.log("🔁 livereload 起動中...");
