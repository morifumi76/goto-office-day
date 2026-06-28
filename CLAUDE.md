# goto-office-day

## 概要
名古屋・なごのキャンパスへの「出社日」をカレンダー上で塗って管理する、Notion埋め込み用のカレンダーウィジェット。今月・来月・再来月の3ヶ月を横並びで表示する。

## 技術スタック
- フレームワーク: なし（素のHTML / CSS / JavaScript）
- 言語: HTML / CSS / JavaScript
- スタイル: 単一HTMLファイル内にCSS/JSを同梱（外部ライブラリ・CDN・ビルド工程なし）
- デプロイ先: GitHub Pages
- その他: localStorage で保存（保存キー: 出社日=`nagoya-shukkin-days`、帰省日=`nagoya-kisei-days`）
- 複数端末で共有する場合: `SYNC_URL` に Apps Script のURLを設定すると、Googleスプレッドシートに保存して共有する（未設定なら従来どおり端末内のみ）。サーバー側コードは `docs/sync-apps-script.gs`、設定手順は `docs/sync-setup.md`。

## フォルダ構成
```
goto-office-day/
├── input.md          ← 元の指示書
├── src/
│   └── index.html    ← 完成版ウィジェット（メイン成果物）
├── docs/specs/       ← 仕様書置き場
└── README.md
```

## このプロジェクト固有のルール
- 成果物は `src/index.html` の単一ファイルで完結させる（CSS・JSも同ファイル内）。
- フレームワーク・外部ライブラリ・CDNは使わない。ファイルを開けば動くこと。
- Notionの埋め込み（iframe）内で動くことが前提。横幅が狭いときは3ヶ月が折り返す。
- マスはクリックで4状態トグル（黄色＝出社 → 緑＝帰省 → 灰色＝その他 → 解除）。緑・灰色の呼び名は `HOME_LABEL` / `GRAY_LABEL` で変更可。出社カウントは黄色のみ集計。週は月曜始まり。
- 祝日は `HOLIDAYS`（Set）にハードコード。毎年2月ごろ確定する翌年分を年明けに追記する。
- main ブランチへ直接 push しない（featureブランチ → PR）。commit / push 前に内容を説明して確認する。

## 主要な外部サービス
- GitHub Pages（公開）
- Notion（`/embed` で埋め込み表示）

## 現在の状態
初版実装完了。`src/index.html` に3ヶ月カレンダーを実装（仕様 + ダークモード対応・過去日付の減光・アクセシビリティ強化）。出社（黄）・帰省（緑）・その他（灰）の4状態トグルに対応。`SYNC_URL` 設定でGoogleスプレッドシート経由の複数端末共有にも対応（任意）。
