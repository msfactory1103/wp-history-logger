const fs = require("fs");
const mysql = require("mysql2/promise");
const fetch = require("node-fetch"); // v2.x を前提とする

console.log(`🐛 [DEBUG] log-content.js 実行開始！ filePath: ${process.argv[2]}`);

// --- ファイル読み込み＆POST_ID抽出 ---
const filePath = process.argv[2] || "./contents/about.html";
const html = fs.readFileSync(filePath, "utf8");
const cleanedHtml = html.replace(/<!--\s*POST_ID:\d+\s*-->/, "");
const match = html.match(/<!--\s*POST_ID:(\d+)\s*-->/);
const postId = match ? match[1] : null;
console.log("📌 POST_ID:", postId);
if (!postId) {
  console.error("❌ POST_ID が見つかりません。HTMLの先頭に <!-- POST_ID:123 --> を記載して！");
  process.exit(1);
}

(async () => {
  try {
    // --- MySQLログ保存（履歴） ---
    const db = await mysql.createConnection({
      host: "localhost",
      user: "wordpress",
      password: "wordpress",
      database: "wordpress"
    });

    await db.execute(
      `INSERT INTO wp_content_histories (post_id, content, updated_by)
       VALUES (?, ?, ?)`,
      [postId, html, "vscode-bot"]
    );

    console.log("✅ 履歴を保存しました。");

    // --- WordPressへ反映 ---
    const wpUser = "test";
    const wpAppPassword = "process.env.WP_APP_PASSWORD";
    const base64Auth = Buffer.from(`${wpUser}:${wpAppPassword}`).toString("base64");

    const res = await fetch(`http://localhost:8081/index.php?rest_route=/wp/v2/pages/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${base64Auth}`
      },
      body: JSON.stringify({ content: cleanedHtml })

    });

    const text = await res.text();

    if (text.startsWith('<')) {
      throw new Error("HTML returned instead of JSON: probably theme output issue");
    }

    const data = JSON.parse(text);
    if (res.ok) {
      console.log("✅ WordPress反映OK:", data.link);
    } else {
      console.error("❌ WP反映エラー:", data);
    }

    db.end();
  } catch (err) {
    console.error("❌ 全体エラー:", err);
  }
})();
