# CLAUDE.md - Bulk Screenshot Importer

## プロジェクト概要

Figmaプラグイン「Bulk Screenshot Importer」。ローカルのスクリーンショットをFigmaにインポートする。2つのモードを搭載。

## テックスタック

- **Figma Plugin API**: `figma.createSection`, `figma.createFrame`, `figma.createRectangle`, `figma.createImage`
- **TypeScript**: `src/code.ts` → `code.js`（Figmaサンドボックス側）
- **HTML/CSS/TS**: `src/ui/` → `ui.html`（esbuild でバンドル）
- **Gemini API**: セクション名のAI提案（オプション、BYOK）
- **依存関係**: `@figma/plugin-typings`, `esbuild`, `typescript`（すべて devDependencies）

## ファイル構成

```
screenshot-importer/
├── manifest.json        # Figmaプラグイン定義（ID: 1600513697106504895）
├── package.json         # 依存関係・ビルドスクリプト
├── tsconfig.json        # TypeScript設定（レガシービルド用）
├── build.mjs            # esbuildビルドスクリプト
├── src/
│   ├── code.ts          # Figmaサンドボックスコード（メインロジック）
│   └── ui/
│       ├── index.html   # UIテンプレート（CSS/JSプレースホルダー付き）
│       ├── styles.css   # UIスタイル（ダークモード対応、CSS変数使用）
│       └── main.ts      # UIロジック（i18n、解析、AI提案、インポート処理）
├── code.js              # ビルド出力（gitにコミット必要）
├── ui.html              # ビルド出力（gitにコミット必要）
├── code.ts              # レガシーソース（src/code.ts のコピー、互換用）
├── icon.svg             # プラグインアイコン（128x128）
├── cover.svg            # カバー画像（1920x960）
├── README.md            # 英語・日本語のREADME
├── GUIDE.md             # 詳細ワークフローガイド
├── FIGMA_COMMUNITY.md   # Figma Community公開用情報
├── CLAUDE.md            # このファイル
├── progress.txt         # 進捗記録
└── lessons.md           # 学習記録
```

## ビルド・実行

```bash
npm install
npm run build         # esbuild: src/ → code.js(minified) + ui.html(minified)
npm run build:legacy  # tsc: code.ts → code.js（UI非対応）
npm run watch         # esbuild ウォッチモード（minify無効）
```

Figmaで使用するには `manifest.json` を「Import plugin from manifest」で読み込む。

## アーキテクチャ

### 通信フロー

```
ui.html (ブラウザ環境)  ←→  code.ts (Figmaサンドボックス)
  - ファイル選択・解析         - Figmaノード作成
  - 画像処理・base64変換       - AutoLayout構築
  - ピクセル比較              - Section作成
  - Gemini API呼び出し        - 進捗報告
  - プレビューUI
```

`parent.postMessage()` → `figma.ui.onmessage` でUI→Figma通信。
`figma.ui.postMessage()` → `window.onmessage` でFigma→UI通信。
Gemini API は UI iframe から直接 `fetch()` で呼び出す。

### メッセージタイプ

| Type | 方向 | 用途 |
|------|------|------|
| `import` | UI→Figma | Folder Importデータ送信 |
| `smart-import` | UI→Figma | Smart Importデータ送信 |
| `progress` | Figma→UI | 進捗更新 |
| `complete` | Figma→UI | 完了通知 |
| `error` | Figma→UI | エラー通知 |

### Smart Import アルゴリズム

1. 画像を120px幅にダウンスケールしてピクセル比較用データ生成
2. 隣接画像間でスクロール連続性を判定（下部ストリップ vs 上部領域のマッチング）
   - `stripHasEnoughDetail`: ストリップのピクセル分散が低い（≒単色）場合はスクロール判定をスキップ
3. スクロールグループを構築
4. グループ間でセクション境界を判定（ナビバー + 全体色分布の変化）
5. セクション名を提案:
   - Gemini APIキーあり → AI Vision で自動提案
   - APIキーなし → ファイル名キーワード辞書（20カテゴリ）でマッチング
6. セクションを構築してプレビュー表示（ゴーストテキストUI）

### AI セクション名提案（Gemini API）

- BYOK（Bring Your Own Key）パターン: ユーザーが自分のAPIキーを設定
- Gemini 2.0 Flash の無料枠（1日1,500リクエスト）で十分
- 全セクションの代表サムネイルを1回のAPI呼び出しで送信
- APIキーは `localStorage` に保存
- エラー時はファイル名ベースのサジェストにフォールバック

## コーディング規約

- ソースは `src/` 配下で開発し、`esbuild` (`build.mjs`) でバンドル
- `code.ts` はFigma APIのみ使用（`atob` 不可、カスタムbase64デコーダー使用）
- innerHTML使用時は必ず `escapeHtml()` でエスケープ
- 画像処理では `URL.createObjectURL()` の後に必ず `URL.revokeObjectURL()` を呼ぶ
- `img.onload` には必ず `img.onerror` ハンドラも設置
- HTML インラインハンドラから呼ぶ関数は `(window as any).fn = fn` で明示的に公開

## 注意事項

- `manifest.json` の `networkAccess` は `generativelanguage.googleapis.com` のみ許可
- `code.js` は手動コミットが必要（TypeScriptビルド出力）
- Figmaプラグインは内蔵Chromiumで動作するため、クロスブラウザ対応は不要
- 大量画像処理時はUIフリーズ防止のため `await new Promise(r => setTimeout(r, 0))` で yield
- Gemini APIキーはURLクエリパラメータで送信（API仕様上の標準的方法）
