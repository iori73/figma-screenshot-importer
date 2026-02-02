# Screenshot Importer

Import local screenshot folders into Figma while preserving your folder hierarchy.

## Features

- **Folder Structure Preservation**: Converts local folder structure to Figma's Section/AutoLayout hierarchy
- **High-Resolution Support**: Automatically splits large images into chunks (4096px max) to maintain quality
- **Auto Resize**: Standardizes image width (default 360px)
- **Preview**: Review folder structure before importing

## Use Cases

- Competitive analysis and benchmarking
- Website/app screenshot collections
- Design research and reference libraries
- UI pattern documentation

## Folder Structure Conversion

```
Local                              Figma
─────                              ─────
screenshots/
├── 01_category/                   → [Section] 01_category
│   ├── subcategory/               →   [AutoLayout] subcategory
│   │   ├── site-top.png           →     [Frame] site-top.png
│   │   │                          →       [Image] chunk-1
│   │   │                          →       [Image] chunk-2
│   │   └── site-about.png         →     [Frame] site-about.png
│   └── another/                   →   [AutoLayout] another
│       └── page.png               →     [Frame] page.png
└── 02_another_category/           → [Section] 02_another_category
    └── ...
```

> **Tip**: Use number prefixes (01_, 02_) to control the order of sections.

## Usage Guide

For detailed workflow instructions including AI-assisted screenshot collection, see **[GUIDE.md](GUIDE.md)**.

## Quick Start

### 1. Install (Development)

```bash
cd screenshot-importer
npm install
npm run build
```

### 2. Add Plugin to Figma

1. Open Figma
2. Menu → Plugins → Development → Import plugin from manifest...
3. Select `screenshot-importer/manifest.json`

### 3. Run the Plugin

1. Launch plugin: Plugins → Development → Screenshot Importer
2. Click "Click to select folder"
3. Select your screenshot folder
4. Preview the structure
5. Adjust settings if needed:
   - **Image Width**: Output image width (default: 360px)
   - **Max Chunk Height**: Maximum height before splitting (default: 4096px)
6. Click "Import to Figma"

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Image Width | 360px | Output image width |
| Max Chunk Height | 4096px | Maximum height before image splitting |

## Limitations

- Supported formats: PNG, JPG, JPEG
- Hidden files (starting with `.`) are ignored
- Folder depth: Unlimited (processed as nested AutoLayouts)

## License

MIT

---

# Screenshot Importer (日本語)

ローカルのスクリーンショットフォルダをFigmaにインポートするプラグイン。

## 機能

- **フォルダ構造を維持**: ローカルのフォルダ構造をFigmaのSection/AutoLayout階層に変換
- **高解像度維持**: 大きな画像を自動的に分割して高解像度を維持（big insert image相当）
- **自動リサイズ**: 画像幅を統一（デフォルト360px）
- **プレビュー機能**: インポート前にフォルダ構造を確認可能

## 使用ガイド

AI支援によるスクリーンショット収集を含む詳細なワークフローについては、**[GUIDE.md](GUIDE.md)** を参照してください。

## フォルダ構造の変換

```
ローカル                           Figma
────────                          ─────
screenshots/
├── website-desktop/              → [Section] website-desktop
│   ├── booking-flow/             →   [AutoLayout] booking-flow
│   │   ├── 01-top.png            →     [Frame] 01-top.png
│   │   │                         →       [Image] chunk-1
│   │   │                         →       [Image] chunk-2
│   │   └── 02-modal.png          →     [Frame] 02-modal.png
│   └── top/                      →   [AutoLayout] top
│       └── index.png             →     [Frame] index.png
└── website-mobile/               → [Section] website-mobile
    └── ...
```

## 使用方法

### 1. インストール（開発用）

```bash
cd screenshot-importer
npm install
npm run build
```

### 2. Figmaにプラグインを追加

1. Figmaを開く
2. メニュー → Plugins → Development → Import plugin from manifest...
3. `screenshot-importer/manifest.json` を選択

### 3. プラグインを実行

1. Figmaでプラグインを起動: Plugins → Development → Screenshot Importer
2. 「Click to select folder」をクリック
3. スクリーンショットが入っているフォルダを選択
4. プレビューで構造を確認
5. 必要に応じて設定を調整:
   - **Image Width**: 出力画像の幅（デフォルト: 360px）
   - **Max Chunk Height**: 画像分割の最大高さ（デフォルト: 4096px）
6. 「Import to Figma」をクリック

## 設定項目

| 項目 | デフォルト | 説明 |
|------|-----------|------|
| Image Width | 360px | 出力画像の幅 |
| Max Chunk Height | 4096px | 画像を分割する最大高さ |

## 制限事項

- 対応フォーマット: PNG, JPG, JPEG
- 隠しファイル（`.`で始まるファイル）は無視
- フォルダ深度: 任意（ネストしたAutoLayoutとして再帰処理）

## 開発

```bash
# TypeScriptをウォッチモードでビルド
npm run watch

# 単発ビルド
npm run build
```

## ファイル構成

```
screenshot-importer/
├── manifest.json     # プラグイン定義
├── package.json      # 依存関係
├── tsconfig.json     # TypeScript設定
├── code.ts           # Figmaサンドボックスコード
├── code.js           # コンパイル済みJS
├── ui.html           # プラグインUI
├── README.md         # このファイル
└── GUIDE.md          # 使用ガイド
```
