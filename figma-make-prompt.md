# Figma Make Prompts — Bulk Screenshot Importer

## 1. アイコン (128x128px)

### メインプロンプト

```
Create a 128x128px plugin icon for "Bulk Screenshot Importer" — a Figma plugin that organizes smartphone screenshots into structured layouts.

Design specifications:
- Shape: Rounded square (radius ~20px), full bleed
- Background: Vibrant gradient from bottom-left to top-right (#6366F1 purple → #18A0FB Figma blue → #06B6D4 cyan)
- Content: A grid of small white rounded-rectangle cards arranged in 4 sections (indicated by subtle white section outlines)
  - Each card represents a smartphone screenshot (roughly 9:16 ratio)
  - Cards have a colored header bar at the top (pastel pink, blue, green, yellow — varied per card)
  - Some cards are stacked vertically in pairs with a dashed white border around them, representing "scroll groups"
  - Cards have faint text/content lines inside
- Section outlines: Very subtle white rectangles with ~25% opacity, grouping cards into clusters
- Small white rounded rectangles as section labels above each group

The overall impression should be: "organized screenshot grid on a colorful background." Must be recognizable at very small sizes (32px display). Prioritize rhythm and pattern over detail.
```

### バリエーションプロンプト

```
Please create 3 alternative versions of this icon:

Variation A — "Bolder Grid": Increase card size to 3 columns × 2 rows, remove section outlines. Make cards more visible with stronger white fills and bolder header bars. Maximize visibility at tiny sizes.

Variation B — "Phone Silhouette": Replace the grid with a single white smartphone silhouette (rounded rectangle with notch) containing 3-4 mini cards arranged inside it. This communicates "phone screenshots" more directly.

Variation C — "Abstract Flow": Replace the grid with 3-4 white cards flowing diagonally from bottom-left to top-right, with subtle motion lines or arrows between them. Conveys the "import/organize" action rather than the static result.
```

---

## 2. カバー画像 (1920x960px)

### メインプロンプト

```
Create a 1920x960px cover image for "Bulk Screenshot Importer" — a Figma plugin that automatically organizes smartphone app screenshots into structured Figma layouts.

Design specifications:

Background:
- Light grey (#F0F0F0) Figma canvas style with a subtle dot grid pattern

Title (centered, top area):
- "Bulk Screenshot Importer" — bold, dark (#1A1A2E), ~42px, modern sans-serif
- Subtitle: "Organize your screenshots into Figma — instantly" — regular weight, grey (#666), ~22px

Main Visual (center/bottom area):
- Bird's-eye view of the plugin output: 4 Figma "Section" containers arranged in a 2×2 grid
- Each Section has:
  - A purple (#9333EA) border with a section name label (e.g., "Home", "Search", "Profile", "Settings")
  - 4-7 smartphone screenshot cards arranged horizontally inside
  - Each card is a white rounded rectangle (~120×270px) with:
    - A colored header bar (varied pastel colors: indigo, blue, pink, green, yellow, purple)
    - Placeholder text lines and content blocks inside
    - A bottom navigation bar with 4 dots (one highlighted in the section's color)
  - Some adjacent cards are enclosed in a blue (#18A0FB) "scroll group" border, representing detected scroll sequences — these contain 2 stacked cards

Overall feel:
- Clean, professional, "tool demo" aesthetic
- Looks like a zoomed-out Figma canvas showing the organized output
- Light drop shadows on cards for subtle depth
- The Sections should feel structured and systematic — conveying that this plugin creates order from chaos
```

### バリエーションプロンプト

```
Please create 2 alternative cover designs:

Variation A — "Before/After": Split the cover horizontally. Left half shows a messy pile of overlapping screenshots (slightly rotated, chaotic). Right half shows the same screenshots neatly organized in Sections with scroll groups. A subtle arrow or dividing line in the center connects the two halves. Title text centered above.

Variation B — "Isometric View": Same content as the main design but rendered in a slight isometric (3D) perspective, as if viewing the Figma canvas from an angle. Cards have visible edges/depth. This adds visual interest while still communicating the organized output.
```

---

## 使い方

1. Figma Make (figma.com/make) を開く
2. 上記のプロンプトをそのままペーストして生成
3. 生成結果をベースに、Figma上で微調整
4. バリエーションが必要な場合は、バリエーションプロンプトを追加で投入
5. 最終的に icon は 128x128px、cover は 1920x960px でエクスポート
