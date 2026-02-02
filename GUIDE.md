# Screenshot Importer - Usage Guide

This guide covers different workflows for collecting and organizing screenshots before importing them into Figma.

## Table of Contents

- [Recommended Folder Structure](#recommended-folder-structure)
- [Workflow A: AI-Assisted (Cursor, Claude, etc.)](#workflow-a-ai-assisted-cursor-claude-etc)
- [Workflow B: Technical Users (CLI Tools & Automation)](#workflow-b-technical-users-cli-tools--automation)
- [Workflow C: Non-Technical Users (Manual)](#workflow-c-non-technical-users-manual)
- [Tips & Best Practices](#tips--best-practices)

---

## Recommended Folder Structure

Before importing, organize your screenshots in this structure:

```
screenshots/
├── 01_Category_Name/           # → Becomes [Section] in Figma
│   ├── subcategory/            # → Becomes [AutoLayout]
│   │   ├── site-top.png        # → Becomes [Frame] with image
│   │   └── site-about.png
│   └── another-site.png        # Direct files also supported
├── 02_Another_Category/
│   └── ...
└── 03_Third_Category/
    └── ...
```

**Tips:**
- Use number prefixes (`01_`, `02_`) to control section order
- Keep folder names descriptive but concise
- Supported formats: PNG, JPG, JPEG

---

## Workflow A: AI-Assisted (Cursor, Claude, etc.)

**Best for:** Users with AI coding assistants who want to automate bulk screenshot collection.

### Prerequisites

- [Cursor](https://cursor.sh/) or similar AI-powered IDE
- MCP (Model Context Protocol) tools like Playwright or Chrome DevTools

### Step 1: Request Screenshots via AI

Open Cursor and ask the AI to capture screenshots. Example prompts:

```
Take full-page screenshots of the following websites and organize them 
into a folder structure by category:

Websites:
- https://example1.com (Category: E-commerce)
- https://example2.com (Category: E-commerce)
- https://example3.com (Category: SaaS)

Save to: ~/Documents/screenshots/
```

### Step 2: Let AI Organize the Folder Structure

The AI will:
1. Create category folders (e.g., `01_E-commerce/`, `02_SaaS/`)
2. Navigate to each URL using Playwright/Chrome DevTools
3. Take full-page screenshots
4. Save with descriptive filenames

### Step 3: Review and Import

1. Check the generated folder structure
2. Open Figma and run Screenshot Importer
3. Select the root folder
4. Preview and import

### Example: Competitive Analysis Workflow

```
I want to do competitive analysis for travel booking apps.
Please:
1. Take full-page screenshots of these sites:
   - booking.com
   - airbnb.com
   - expedia.com
   - hotels.com
2. Organize into folders:
   - 01_Booking_Flow (search, results, detail pages)
   - 02_User_Account (login, profile, settings)
   - 03_Mobile_Views (if responsive)
3. Save to: ~/Documents/travel-competitors/
```

### MCP Tools Configuration

If using Cursor with MCP, ensure you have Playwright or Chrome DevTools MCP enabled:

```json
// .cursor/mcp.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic/mcp-server-playwright"]
    }
  }
}
```

---

## Workflow B: Technical Users (CLI Tools & Automation)

**Best for:** Developers who prefer command-line tools or want to set up automated pipelines.

### Option 1: Using Pageres CLI

[Pageres](https://github.com/sindresorhus/pageres-cli) is a powerful screenshot tool.

```bash
# Install
npm install -g pageres-cli

# Single screenshot
pageres https://example.com 1280x800

# Multiple sites with naming
pageres https://site1.com https://site2.com 1280x800 \
  --filename='<%= url %>'

# Full page
pageres https://example.com 1280x800 --crop=false
```

### Option 2: Using Puppeteer Script

Create a custom script for more control:

```javascript
// screenshot.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sites = {
  '01_E-commerce': [
    { name: 'amazon', url: 'https://amazon.com' },
    { name: 'ebay', url: 'https://ebay.com' }
  ],
  '02_SaaS': [
    { name: 'notion', url: 'https://notion.so' },
    { name: 'figma', url: 'https://figma.com' }
  ]
};

async function captureScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  for (const [category, urls] of Object.entries(sites)) {
    const dir = path.join('screenshots', category);
    fs.mkdirSync(dir, { recursive: true });

    for (const { name, url } of urls) {
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.screenshot({
        path: path.join(dir, `${name}.png`),
        fullPage: true
      });
      console.log(`Captured: ${name}`);
    }
  }

  await browser.close();
}

captureScreenshots();
```

Run with:
```bash
npm install puppeteer
node screenshot.js
```

### Option 3: Browser Extensions

Recommended extensions for manual capture with better organization:

| Extension | Browser | Features |
|-----------|---------|----------|
| [GoFullPage](https://chrome.google.com/webstore/detail/gofullpage) | Chrome | Full page, PNG/PDF |
| [Fireshot](https://getfireshot.com/) | Chrome/Firefox | Full page, annotations |
| [Awesome Screenshot](https://www.awesomescreenshot.com/) | Chrome/Firefox | Full page, cloud sync |

After capturing, organize files into the recommended folder structure manually.

---

## Workflow C: Non-Technical Users (Manual)

**Best for:** Users who prefer a simple, no-code approach.

### Step 1: Create Your Folder Structure

1. Create a main folder (e.g., `My Screenshots`)
2. Inside, create category folders:
   ```
   My Screenshots/
   ├── 01_Competitors/
   ├── 02_Inspiration/
   └── 03_Reference/
   ```

### Step 2: Capture Screenshots

**Using Browser's Built-in Tool:**

**Chrome:**
1. Open the website
2. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
3. Type "screenshot" and select "Capture full size screenshot"
4. Save to your organized folder

**Firefox:**
1. Right-click on the page
2. Select "Take Screenshot"
3. Choose "Save full page"
4. Save to your organized folder

**Safari:**
1. Enable Developer menu (Preferences → Advanced → Show Develop menu)
2. Develop → Show Web Inspector
3. Click the camera icon or use Element screenshot

### Step 3: Use Individual File Selection

If you don't want to organize files into folders:

1. Open Screenshot Importer in Figma
2. Instead of "Click to select folder", use the **individual file selector** below it
3. Select multiple PNG/JPG files at once
4. All images will be imported into a single "imported-images" section

### Step 4: Import to Figma

1. Open Figma
2. Run Screenshot Importer plugin
3. Click "Click to select folder"
4. Navigate to your `My Screenshots` folder
5. Preview the structure
6. Click "Import to Figma"

---

## Tips & Best Practices

### Naming Conventions

| Good | Bad |
|------|-----|
| `01_competitor-homepage.png` | `screenshot 2024.png` |
| `booking-flow-step1.png` | `IMG_1234.png` |
| `mobile-menu-open.png` | `test.png` |

### Optimal Image Settings

| Setting | Recommended | Why |
|---------|-------------|-----|
| Image Width | 360px | Good for side-by-side comparison |
| Image Width | 1440px | Full-size desktop review |
| Max Chunk Height | 4096px | Figma's limit per image |

### Organizing Large Collections

For 50+ screenshots:
1. Use a spreadsheet to plan categories first
2. Create a naming convention document
3. Consider sub-subcategories for deep organization

```
screenshots/
├── 01_Competitors/
│   ├── direct-competitors/
│   │   ├── company-a/
│   │   └── company-b/
│   └── indirect-competitors/
├── 02_By-Feature/
│   ├── onboarding/
│   ├── checkout/
│   └── settings/
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not showing in preview | Check file format (PNG/JPG only) |
| Folder structure not recognized | Select the parent folder, not a subfolder |
| Import takes too long | Reduce image count or increase chunk height |
| Images appear blurry | Increase Image Width setting |

---

## Need Help?

- **Issues:** [GitHub Issues](https://github.com/iori73/figma-screenshot-importer/issues)
- **Feature Requests:** Open a GitHub issue with the "enhancement" label

---

# Screenshot Importer - 使用ガイド（日本語）

このガイドでは、Figmaにインポートする前のスクリーンショット収集と整理のワークフローを説明します。

## 目次

- [推奨フォルダ構造](#推奨フォルダ構造)
- [ワークフローA: AI支援（Cursor、Claudeなど）](#ワークフローa-ai支援cursorclaude)
- [ワークフローB: 技術者向け（CLIツールと自動化）](#ワークフローb-技術者向けcliツールと自動化)
- [ワークフローC: 非技術者向け（手動）](#ワークフローc-非技術者向け手動)

---

## 推奨フォルダ構造

インポート前に、以下の構造でスクリーンショットを整理してください：

```
screenshots/
├── 01_カテゴリ名/              # → Figmaで[Section]になる
│   ├── サブカテゴリ/           # → [AutoLayout]になる
│   │   ├── サイト-トップ.png   # → 画像付き[Frame]になる
│   │   └── サイト-概要.png
│   └── 別サイト.png            # 直接配置も可能
├── 02_別カテゴリ/
│   └── ...
└── 03_三番目/
    └── ...
```

**ポイント:**
- 番号プレフィックス（`01_`、`02_`）でセクションの順序を制御
- フォルダ名は説明的かつ簡潔に
- 対応フォーマット：PNG、JPG、JPEG

---

## ワークフローA: AI支援（Cursor、Claude）

**対象:** AIコーディングアシスタントを使って大量のスクリーンショット収集を自動化したいユーザー。

### 必要なもの

- [Cursor](https://cursor.sh/)などのAI搭載IDE
- PlaywrightやChrome DevToolsなどのMCPツール

### ステップ1: AIにスクリーンショットを依頼

Cursorを開き、AIにスクリーンショットを依頼します。プロンプト例：

```
以下のWebサイトのフルページスクリーンショットを撮影し、
カテゴリ別のフォルダ構造に整理してください：

サイト:
- https://example1.com（カテゴリ: ECサイト）
- https://example2.com（カテゴリ: ECサイト）
- https://example3.com（カテゴリ: SaaS）

保存先: ~/Documents/screenshots/
```

### ステップ2: AIがフォルダ構造を整理

AIが以下を実行します：
1. カテゴリフォルダを作成（例：`01_ECサイト/`、`02_SaaS/`）
2. Playwright/Chrome DevToolsで各URLにアクセス
3. フルページスクリーンショットを撮影
4. 説明的なファイル名で保存

### ステップ3: 確認してインポート

1. 生成されたフォルダ構造を確認
2. FigmaでScreenshot Importerを起動
3. ルートフォルダを選択
4. プレビューしてインポート

---

## ワークフローB: 技術者向け（CLIツールと自動化）

**対象:** コマンドラインツールを好む開発者、または自動化パイプラインを構築したいユーザー。

### オプション1: Pageres CLI

```bash
# インストール
npm install -g pageres-cli

# 単一サイト
pageres https://example.com 1280x800

# フルページ
pageres https://example.com 1280x800 --crop=false
```

### オプション2: Puppeteerスクリプト

詳細は英語セクションのスクリプト例を参照してください。

### オプション3: ブラウザ拡張機能

| 拡張機能 | ブラウザ | 特徴 |
|----------|----------|------|
| GoFullPage | Chrome | フルページ、PNG/PDF |
| Fireshot | Chrome/Firefox | フルページ、注釈 |

---

## ワークフローC: 非技術者向け（手動）

**対象:** シンプルでノーコードなアプローチを好むユーザー。

### ステップ1: フォルダ構造を作成

1. メインフォルダを作成（例：`マイスクリーンショット`）
2. 中にカテゴリフォルダを作成

### ステップ2: スクリーンショットを撮影

**Chromeの場合:**
1. Webサイトを開く
2. `Cmd+Shift+P`（Mac）または`Ctrl+Shift+P`（Windows）を押す
3. "screenshot"と入力し、「フルサイズのスクリーンショットをキャプチャ」を選択
4. 整理したフォルダに保存

### ステップ3: 個別ファイル選択を使用

フォルダに整理したくない場合：
1. FigmaでScreenshot Importerを開く
2. 「Click to select folder」の下にある**個別ファイルセレクター**を使用
3. 複数のPNG/JPGファイルを一度に選択
4. すべての画像が「imported-images」セクションにインポートされます

### ステップ4: Figmaにインポート

1. Figmaを開く
2. Screenshot Importerプラグインを実行
3. 「Click to select folder」をクリック
4. スクリーンショットフォルダに移動
5. 構造をプレビュー
6. 「Import to Figma」をクリック

---

## ヘルプが必要な場合

- **問題報告:** [GitHub Issues](https://github.com/iori73/figma-screenshot-importer/issues)
