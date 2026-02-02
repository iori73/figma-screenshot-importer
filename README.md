# Screenshot Importer

ローカルのスクリーンショットフォルダをFigmaにインポートするプラグイン。

## 機能

- **フォルダ構造を維持**: ローカルのフォルダ構造をFigmaのSection/AutoLayout階層に変換
- **高解像度維持**: 大きな画像を自動的に分割して高解像度を維持（big insert image相当）
- **自動リサイズ**: 画像幅を統一（デフォルト360px）
- **プレビュー機能**: インポート前にフォルダ構造を確認可能

## フォルダ構造の変換

```
ローカル                           Figma
────────                          ─────
screenshots/
├── website-desktop/              → [Section] website-desktop
│   ├── booking-flow/             →   [AutoLayout] booking-flow
│   │   ├── 01-top.png            →     [Group] 01-top.png
│   │   │                         →       [Image] chunk-1
│   │   │                         →       [Image] chunk-2
│   │   └── 02-modal.png          →     [Group] 02-modal.png
│   └── top/                      →   [AutoLayout] top
│       └── index.png             →     [Group] index.png
└── website-mobile/               → [Section] website-mobile
    └── ...
```

## 使用方法

### 1. インストール

```bash
cd figma-plugins/screenshot-importer
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
3. スクリーンショットが入っているフォルダを選択（例: `figma-screenshots`）
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

## 技術詳細

### 画像処理（UI側）

1. Canvas APIで画像を指定幅にリサイズ
2. 高さが最大値を超える場合は複数チャンクに分割
3. 各チャンクをPNG形式のbase64に変換
4. postMessageでFigmaサンドボックスに送信

### レイヤー生成（Figma側）

1. トップレベルフォルダ → Section
2. サブフォルダ → AutoLayout（horizontal）
3. 画像ファイル → Frame（Group）
4. 画像チャンク → Rectangle with Image fill

### 制限事項

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
└── README.md         # このファイル
```
