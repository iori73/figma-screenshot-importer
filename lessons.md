# Lessons Learned

## Figma Plugin Development

### Figmaサンドボックスの制約
- `atob()` が使えない → カスタム base64 デコーダーが必要
- `fetch()` は `manifest.json` の `networkAccess.allowedDomains` で許可されたドメインのみ
- `networkAccess: ["none"]` の場合、外部APIは一切使えない

### manifest.json の networkAccess は UI iframe にも適用される
- Gemini API を UI の `fetch()` で呼び出す場合でも、`manifest.json` に許可ドメインを記載しなければブロックされる
- `allowedDomains` に正確な URL（`https://generativelanguage.googleapis.com`）を指定する必要がある
- AI機能を追加したら manifest の更新を忘れずに確認する

### メモリ管理
- `URL.createObjectURL()` を使ったら必ず `URL.revokeObjectURL()` で解放する
- 100枚以上の画像処理でメモリリークが顕著になる
- 画像処理後は canvas への参照を残さないようにする

### UIスレッドブロッキング
- ピクセル単位のネストループは50枚以上の画像でUIをフリーズさせる
- `await new Promise(r => setTimeout(r, 0))` をループの5回ごとに入れることで、UIスレッドに制御を返せる
- 重い処理は Web Worker が理想だが、Figma Plugin UI では制約がある

### `img.onerror` の重要性
- `img.onload` だけでは、壊れた画像で Promise が永久に resolve しない
- `onerror` ハンドラは必ずセットで実装する

## コード品質

### innerHTML と XSS
- ファイル名をそのまま innerHTML に挿入すると、`<script>` や `"` で HTML が壊れる
- `escapeHtml()` ユーティリティを共通関数として用意し、全ての動的文字列に適用
- Figma プラグインは外部ユーザー入力が少ないが、ファイル名は信頼できない入力

### エラーハンドリングの粒度
- `figma.createImage()` は不正なバイト列でクラッシュする可能性がある
- 画像単位で try-catch し、失敗した画像をスキップしつつ処理を継続する設計が重要
- スキップされた画像数をユーザーに通知する

## Smart Import アルゴリズム

### ピクセル比較のアプローチ
- 120px 幅へのダウンスケールで十分な精度が出る（パフォーマンスと精度のバランス）
- スクロール検出: 下部15%ストリップと上部65%領域のスライディングウィンドウマッチング
- ステータスバー（上部6%）とナビバー（下部12%）を除外することで誤検出を削減

### 単色ストリップ問題と分散チェック
- ダーク系UIアプリ（例: GO Taxi）では、画面下部がほぼ単色の濃紺になる
- 単色ストリップ同士の比較は、コンテンツが異なっても高い類似度を返す → スクロール誤検出
- `stripHasEnoughDetail`: ストリップのピクセル分散（variance）を計算し、閾値未満ならスクロール判定をスキップ
- variance < 80 をほぼ単色と判定する基準として採用

### セクション検出の工夫
- ナビバー領域（下部13%）の類似度だけでは不十分
- 全体色分布（10行サンプリング）との組み合わせで精度向上
- 閾値はユーザーがスライダーで調整可能にすることが重要（万能な値は存在しない）

## AI セクション名提案

### BYOK（Bring Your Own Key）パターン
- 各ユーザーが自分のAPIキーを取得・設定する設計
- 開発者が共有キーを埋め込まないため、ユーザー数に関わらずコストゼロ
- Gemini 2.0 Flash の無料枠（1日1,500リクエスト）で十分すぎる
- APIキー未設定でもプラグインは完全に動作する（AI提案が無効になるだけ）

### ファイル名ベースのフォールバック
- AI APIが使えない場合のために、ファイル名キーワード辞書（20カテゴリ）を用意
- `IMG_1234.PNG` のような汎用ファイル名では効果がない → `Section N` にフォールバック
- 将来的にOCRなどの追加手段を組み込む拡張ポイントとして設計

### ゴーストテキストUIでのサジェスト表示
- IDE のインラインコンプリーションを参考に、placeholder 形式で提案を表示
- ユーザーが何も入力せずエクスポートした場合、suggestedName を自動採用
- Tab/Enter で明示的に受入可能

## UX

### 初見ユーザーへの配慮
- 「Scroll Sensitivity」「Section Sensitivity」は説明なしでは意味不明
- スライダーの下に短いヒントテキスト（"Higher = stricter scroll matching"）を追加するだけで理解度が大きく向上
- Smart Import の概要説明を1行追加するだけでも、何ができるプラグインかが明確になる

### タブモードの説明
- Folder Import と Smart Import の違いは初見ユーザーにはわからない
- 各タブの直下に1-2行の説明文を追加するだけで使い分けが明確になる
- 「Already organized into folders?」vs「Just have a bunch of screenshots?」のような問いかけ形式が効果的

### 言語切替の明示性
- 単一ボタン（「JA」とだけ表示）は何のことかわからない
- セグメントコントロール（`[EN] [JA]`）にすると、両方の選択肢が常に見えて一目で理解できる

### ダークモード
- Figma プラグイン UI は Figma のテーマに応じて `prefers-color-scheme` が変わる
- CSS カスタムプロパティを使えば、1つの `@media` ブロックで全色切り替え可能
- ハードコードされた色値をすべて変数化するのは手間だが、一度やれば保守が楽

### i18n（国際化）
- Figma Community はグローバルなので英語がデフォルト、しかし日本語ユーザーにも配慮
- `data-i18n` 属性 + `t()` 関数の組み合わせはシンプルで実装コスト低い
- 動的テキスト（プログレスメッセージ等）は `{param}` プレースホルダーで対応
- localStorage で言語設定を永続化（Figma プラグイン iframe では利用可能）
- HTMLのデフォルトテキストとTEXTSオブジェクトの不整合に注意: 英語モードではHTMLのデフォルトがそのまま表示される

## ビルド構成

### 単一 HTML ファイルの限界
- Figma プラグイン UI は `ui.html` として単一ファイルでロードされる制約がある
- 1000行超の単一ファイルは保守性が低い
- esbuild で CSS + TypeScript → 単一 HTML にバンドルする構成で、開発時は分割・リリース時は結合が実現可能
- IIFE バンドルの場合、HTML インラインハンドラ（onclick等）から呼ぶ関数は `(window as any).fn = fn` で明示的に公開が必要

### minify の適用範囲
- ui.html（JS部分）と code.js の両方に minify を適用すべき
- watch モードでは minify 無効にしてデバッグしやすくする（`minify: !isWatch`）
