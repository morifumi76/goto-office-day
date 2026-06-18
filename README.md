# goto-office-day

## 概要
名古屋・なごのキャンパスへの「出社日」をカレンダー上でポチッと塗って管理する、Notion埋め込み用のカレンダーウィジェットです。今月・来月・再来月の3ヶ月を横並びで表示し、出社予定をぱっと見で把握できます。

## デモ / URL
https://morifumi76.github.io/goto-office-day/
<!-- GitHub Pages 公開後のURL。公開前は未確定 -->

## 技術スタック
- フレームワーク: なし（素のHTML / CSS / JavaScript）
- 言語: HTML / CSS / JavaScript
- スタイル: 単一HTMLファイル内に記述（外部ライブラリ・CDNなし）
- デプロイ先: GitHub Pages

## 主な機能
- 今月・来月・再来月の3ヶ月を横並び表示（月曜始まり・年またぎも自動）
- 日付をクリックで「出社日（黄色）」をトグル（もう一度押すと解除）
- ブラウザの `localStorage` に自動保存（更新しても保持。保存キー: `nagoya-shukkin-days`）
- 土日・祝日はうっすら赤背景（出社日として塗った場合は黄色を優先）
- 今日の日付に青い枠線
- 各月のタイトル横に「出社◯日」を自動カウント表示
- ダークモード自動対応（Notionのダークテーマに馴染む）
- 過去の日付はうっすら薄く表示（これからの出社予定に視線が向く）

## ローカルで動かす
ビルド不要です。`src/index.html` をブラウザで開くだけで動きます（ダブルクリックでOK）。

## デプロイ手順（GitHub Pages → Notion埋め込み）
1. featureブランチで作業 → 内容を確認して commit / push
2. GitHubでPRを作成 → main にマージ
3. リポジトリの Settings → Pages を有効化（Branch: `main`）
   - 公開URLを `/goto-office-day/` 直下にしたい場合は `src/index.html` を `index.html` としてルートに置くか、Pagesの公開フォルダ設定を合わせる
4. 発行されたURL（例: `https://morifumi76.github.io/goto-office-day/`）をコピー
5. Notionページで `/embed` → URLを貼り付け → 完成

## 祝日データの更新
祝日は `src/index.html` 内の `HOLIDAYS` にハードコードしています。毎年2月ごろに内閣府から翌年分が確定発表されるので、年明けに翌年分を追記してください（土日は自動判定なので不要）。

## フォルダ構成
```
goto-office-day/
├── input.md          ← 元の指示書
├── src/
│   └── index.html    ← 完成版ウィジェット（メイン成果物）
├── docs/specs/       ← 仕様書置き場
└── README.md         ← このファイル
```

## 作者
森田文弥 / ジョウホウソース株式会社
