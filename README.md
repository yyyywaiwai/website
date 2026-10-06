# yyyywaiwai / personal lab

Astro で静的生成する個人ポートフォリオ。shadcn/ui の Button・Badge・Card と Tailwind CSS を使っています。

## 開発

Node.js 24.16 以降の 24.x、または `package.json` の `engines` を満たすバージョンが必要です。

```sh
npm ci
npm run dev
```

## 検証・ビルド

```sh
npm run lint
npm run build
npm test
npm run preview
```

ビルド結果は `dist/`。既存の静的ホスティングでビルドコマンド `npm run build`、公開ディレクトリ `dist` を指定してください。公開サイトへのデプロイはこのリポジトリの変更とは別の作業です。

## 構成

- `src/pages/index.astro`: ページ、メタ情報、ナビゲーション、アバターの小さな仕掛け
- `src/components/Projects.astro`: プロジェクトの一覧データ
- `src/components/ProjectCard.astro`: プロジェクトの共通表示
- `src/components/Music.astro`: Last.fm と Apple Music
- `src/components/ui/`: shadcn/ui のコンポーネント
- `src/index.css`: 配色、レイアウト、レスポンシブ、アクセシビリティ
- `tests/`: Node.js 標準機能によるクライアント動作・静的 HTML の回帰チェック

本文と shadcn/ui はビルド時に HTML 化し、React のクライアントランタイムは配信しません。ブラウザーの JavaScript はナビゲーション・アバター・音楽ウィジェットだけです。OS のダークモードと動きを減らす設定に追随します。

フォントは Geist をセルフホストし、アイコンは Radix Icons に統一しています。

Last.fm のカードは外部サービスに依存します。表示中のタブだけ 60 秒ごとに先読みし、成功したときだけ差し替えます。取得失敗時にも Last.fm / Apple Music の直リンクを利用できます。

導入資料: [Astro の React 連携](https://docs.astro.build/en/guides/integrations-guide/react/) / [shadcn/ui の Astro 設定](https://ui.shadcn.com/docs/installation/astro)
