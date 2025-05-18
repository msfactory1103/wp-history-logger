# WordPress Auto Sync: VSCode to REST API

A developer workflow for editing static HTML files in VSCode and instantly syncing them to WordPress pages via REST API — complete with browser auto-reload.  
（VSCodeで静的HTMLを編集し、WordPress固定ページへ即時反映＆自動リロードする開発ワークフロー）

---

## 📦 Features / 特長

- ✏️ Auto-detects changes to HTML files edited in VSCode  
  （VSCodeで編集したHTMLを自動検知）
- 🔃 Extracts `POST_ID` from HTML comments and updates WordPress pages via REST API  
  （HTML内の `POST_ID` コメントから対象ページを特定して自動更新）
- 💾 Saves each version of the HTML to a MySQL database (`wp_content_histories`)  
  （各バージョンのHTMLをMySQLに保存し、履歴として保持）  
- 🌐 Automatically reloads both WordPress edit screens and public views  
  （固定ページの編集画面・表示画面どちらも自動リロード対応）
- 🗂 Easy to launch via `.bat` or `npm run` scripts  
  （`.bat` や `npm run` で簡易起動可能）
- 🐳 Docker-based local WordPress development environment  
  （Docker前提のローカル開発環境構成）

---

## 🚧 Status / 現在の状況

**📝 This project is in an early-stage development phase.**  
（本プロジェクトは開発初期段階です）

Initial version includes manually separated scripts and multiple terminal operations.  
（現状はスクリプト分離＋複数ターミナル起動が必要な構成です）

> ✅ Future updates will consolidate this workflow into a single command tool.  
> ✅ 今後は「1ファイル／1コマンド構成」への統合を予定しています。

We deliberately preserve this raw form to document the growth process.  
（あえて“荒削りなまま”公開し、進化の過程を残しています）

---

## 🛠 Usage / 使い方

1. Place your HTML files in the `contents/` directory (e.g. `about.html`)  
   （HTMLファイルを `contents/` に配置）
2. Add a comment like this at the top of the HTML:

```html
<!-- POST_ID:46 -->
```

3. Run the following commands (in separate terminals or via `.bat`)

```bash
npm run watcher      # watches for changes & runs log-content.js
npm run dev-a        # browser-sync for live reload (edit & view screens)
```

Or use the .bat file to launch both at once.
（または .bat ファイルで同時起動可能）

## 📁 Scripts / スクリプト一覧

```json
"scripts": {
  "dev-a": "browser-sync start --proxy http://localhost:8081 --port 3001 --files contents/*.html",
  "watcher": "node watcher.js",
  "start-a": "concurrently \"npm run dev-a\" \"npm run watcher\""
}
```

## 🌐 Requirements / 必要環境

- Node.js (v18+ recommended)
- Docker-based WordPress running at `http://localhost:8081`
（Dockerで起動しているWordPress環境）
- WordPress REST API must be enabled
（REST APIが有効になっていること）
- Recommended: Classic Editor for best API compatibility
（Classic Editor推奨）

## 📈 Future Plans / 今後の予定

- 🔄 Merge watcher and browser-sync into a unified `dev-runner.js`
（watcherとbrowser-syncの統合）
- 🔘 Add CLI support: `node dev-runner --id 123`
（CLI引数対応）
- 🧰 Config-based multi-site support
（複数サイト対応：設定ファイル管理）
- 🖥️ GUI Launcher (e.g. Electron version)
（GUI版ランチャーの構想もあり）
- 📜 History viewer / rollback tool
（履歴閲覧・ロールバック機能の追加）

## 🤝 Contribution / コントリビューション
PRs, issues, and discussions are very welcome!
（プルリク、Issue、ディスカッション歓迎です！）

Whether it’s code, refactoring ideas, or process improvements — let’s evolve it together.
（コード改善・構成アイデア・リファクタ提案など、育ててくれる仲間を歓迎します）

## 📜 License / ライセンス
MIT
