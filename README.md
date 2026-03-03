# Bulk Screenshot Importer

Import local screenshots into Figma with two powerful modes: **Folder Import** for organized collections and **Smart Import** for automatic app screenshot analysis.

## Features

### Folder Import
- **Folder Structure Preservation**: Converts local folder structure to Figma's Section/AutoLayout hierarchy
- **High-Resolution Support**: Automatically splits large images into chunks (4096px max) to maintain quality
- **Auto Resize**: Standardizes image width (default 360px)
- **Preview**: Review folder structure before importing

### Smart Import (NEW)
- **Auto Scroll Detection**: Detects when consecutive screenshots are from the same scrollable screen and stacks them vertically (gap=0)
- **Auto Section Grouping**: Analyzes navigation bar changes and visual similarity to group screenshots by app section
- **Editable Section Names**: Preview detected sections and rename them before importing
- **Sensitivity Controls**: Adjust scroll detection and section detection thresholds via sliders
- **Cancel Support**: Cancel analysis or import at any time

## Use Cases

- Competitive analysis and benchmarking
- **Smartphone app screenshot organization** (Smart Import)
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

### 4. Smart Import (for smartphone screenshots)

1. Launch the plugin and switch to the **Smart Import** tab
2. Select all your app screenshots at once (they will be sorted by filename automatically)
3. Wait for the analysis to detect scroll sequences and section breaks
4. Review the preview: edit section names, check scroll groupings
5. Adjust sensitivity sliders if needed and click "Re-analyze"
6. Click "Import to Figma"

**Output structure:**
```
[Section] Section 1
  └── [Frame: screens] (Horizontal AutoLayout, gap=8px)
        ├── [Frame] screenshot1.png
        ├── [Frame: scroll-group] (Vertical AutoLayout, gap=0px)
        │     ├── [Frame] screenshot2.png
        │     └── [Frame] screenshot3.png
        └── [Frame] screenshot4.png
```

## Settings

### Folder Import

| Setting | Default | Description |
|---------|---------|-------------|
| Image Width | 360px | Output image width |
| Max Chunk Height | 4096px | Maximum height before image splitting |

### Smart Import

| Setting | Default | Description |
|---------|---------|-------------|
| Image Width | 360px | Output image width |
| Max Chunk Height | 4096px | Maximum height before image splitting |
| Scroll Sensitivity | 0.85 | Higher = stricter scroll matching (0.50-0.99) |
| Section Sensitivity | 0.70 | Higher = more sections detected (0.30-0.95) |

## Limitations

- Supported formats: PNG, JPG, JPEG
- Hidden files (starting with `.`) are ignored
- Folder depth: Unlimited (processed as nested AutoLayouts)

## License

MIT

---

# Bulk Screenshot Importer (日本語)

ローカルのスクリーンショットをFigmaにインポートするプラグイン。**Folder Import**（フォルダ構造を維持）と **Smart Import**（スマホスクショを自動整理）の2モード搭載。

## 機能

### Folder Import
- **フォルダ構造を維持**: ローカルのフォルダ構造をFigmaのSection/AutoLayout階層に変換
- **高解像度維持**: 大きな画像を自動的に分割して高解像度を維持
- **自動リサイズ**: 画像幅を統一（デフォルト360px）
- **プレビュー機能**: インポート前にフォルダ構造を確認可能

### Smart Import（新機能）
- **スクロール自動検出**: 連続するスクショが同一画面のスクロールかを自動判定し、縦に連結（gap=0）
- **セクション自動分類**: ナビバーの変化や画面の視覚的類似度から、アプリのセクション（タブ）ごとにグループ化
- **セクション名の編集**: 検出されたセクション名をインポート前に自由に変更可能
- **感度調整**: スライダーでスクロール検出とセクション検出の閾値を調整
- **キャンセル機能**: 解析やインポートをいつでもキャンセル可能

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

### 4. Smart Import（スマホスクショ向け）

1. プラグインを起動し、**Smart Import** タブに切り替え
2. アプリのスクリーンショットをまとめて選択（ファイル名で自動ソートされます）
3. 解析が完了するまで待機（スクロール連結とセクション分けを自動検出）
4. プレビューを確認：セクション名の編集、スクロールグループの確認
5. 必要に応じて感度スライダーを調整して「Re-analyze」
6. 「Import to Figma」をクリック

## 設定項目

### Folder Import

| 項目 | デフォルト | 説明 |
|------|-----------|------|
| Image Width | 360px | 出力画像の幅 |
| Max Chunk Height | 4096px | 画像を分割する最大高さ |

### Smart Import

| 項目 | デフォルト | 説明 |
|------|-----------|------|
| Image Width | 360px | 出力画像の幅 |
| Max Chunk Height | 4096px | 画像を分割する最大高さ |
| Scroll Sensitivity | 0.85 | 高い値 = スクロール判定がより厳密に (0.50-0.99) |
| Section Sensitivity | 0.70 | 高い値 = より多くのセクションを検出 (0.30-0.95) |

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
