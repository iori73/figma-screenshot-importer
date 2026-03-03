// ================================================================
// i18n
// ================================================================

const TEXTS = {
  en: {
    tabFolder: 'Folder Import',
    tabSmart: 'Smart Import',
    folderDesc: 'Already organized your screenshots into folders? Import the folder structure directly as Figma Sections.',
    folderStep1: '1. Select Screenshot Folder',
    folderStep2: '2. Preview Structure',
    folderStep3: '3. Settings',
    smartStep1: '1. Select Screenshots',
    smartStep2: '2. Preview & Edit Sections',
    smartStep3: '3. Settings',
    smartDesc: 'Just have a bunch of screenshots? Drop them all in — scroll sequences and app sections are detected automatically.',
    clickSelectFolder: 'Click to select folder',
    clickSelectScreenshots: 'Click to select app screenshots',
    smartSortHint: 'Select all screenshots at once — sorted by filename automatically',
    orSelectFiles: 'Or select individual image files:',
    imageWidth: 'Image Width (px)',
    maxChunkHeight: 'Max Chunk Height (px)',
    scrollSens: 'Scroll Sensitivity',
    sectionSens: 'Section Sensitivity',
    scrollSensHint: 'Higher = stricter scroll matching',
    sectionSensHint: 'Higher = more sections detected',
    importBtn: 'Import to Figma',
    cancelImport: 'Cancel Import',
    cancelAnalysis: 'Cancel Analysis',
    reAnalyze: 'Re-analyze with current settings',
    viewGuide: 'View Usage Guide',
    processing: 'Processing...',
    sendingToFigma: 'Sending to Figma...',
    importComplete: 'Import complete!',
    importCancelled: 'Import cancelled.',
    cancelling: 'Cancelling...',
    analysisComplete: 'Analysis complete!',
    noValidImages: 'No valid images found.',
    noImageFiles: 'No image files selected',
    noImageInFolder: 'No image files found in selected folder',
    folderParseError: 'Could not parse folder structure. Please select the parent folder containing section folders.',
    loadingImage: 'Loading image {n}/{total}...',
    detectingScroll: 'Detecting scroll sequences... ({n}/{total})',
    detectingSection: 'Detecting section breaks... ({n}/{total})',
    processingFile: 'Processing: {name}',
    largeFileWarning: 'You selected {count} images. Analysis may take a while. Continue?',
    skippedFiles: '{count} non-image file(s) skipped.',
    detectedSummary: 'Detected <strong>{sections}</strong> sections, <strong>{scrollGroups}</strong> scroll groups from <strong>{total}</strong> screenshots.',
    loadErrorsSuffix: ' <span style="color:var(--error-text);">{count} image(s) failed to load and were skipped.</span>',
    statsSummary: '<strong>{sections}</strong> sections, <strong>{scrollGroups}</strong> scroll groups, <strong>{screens}</strong> total screens',
    folderStats: '<strong>{sections}</strong> sections, <strong>{folders}</strong> auto layouts, <strong>{files}</strong> images',
    screens: 'screens',
    screen: 'screen',
    geminiApiKeyLabel: 'Gemini API Key',
    optionalBadge: '(optional)',
    geminiApiKeyHint: 'Free — AI suggests section names from screenshots. Without a key, names are inferred from filenames only.',
    getApiKey: 'Get free API key →',
    aiSuggesting: 'AI suggesting section names...',
    aiSuggestDone: 'AI suggested {count} section names',
    aiSuggestError: 'AI suggestion failed — using filename hints',
    aiSuggestNoKey: '',
  },
  ja: {
    tabFolder: 'フォルダインポート',
    tabSmart: 'スマートインポート',
    folderDesc: 'スクリーンショットをフォルダで整理済み？ フォルダ構造をそのままFigmaのセクションとしてインポートします。',
    folderStep1: '1. スクリーンショットフォルダを選択',
    folderStep2: '2. 構造をプレビュー',
    folderStep3: '3. 設定',
    smartStep1: '1. スクリーンショットを選択',
    smartStep2: '2. セクションのプレビュー・編集',
    smartStep3: '3. 設定',
    smartDesc: 'スクショが未整理でもOK。まとめて投げ込めば、スクロール連結やセクションを自動で検出します。',
    clickSelectFolder: 'クリックしてフォルダを選択',
    clickSelectScreenshots: 'クリックしてスクリーンショットを選択',
    smartSortHint: 'すべてのスクリーンショットを一度に選択 — ファイル名で自動ソート',
    orSelectFiles: 'または個別の画像ファイルを選択:',
    imageWidth: '画像の幅 (px)',
    maxChunkHeight: '最大チャンク高さ (px)',
    scrollSens: 'スクロール感度',
    sectionSens: 'セクション感度',
    scrollSensHint: '高い値 = より厳密なスクロール判定',
    sectionSensHint: '高い値 = より多くのセクションを検出',
    importBtn: 'Figmaにインポート',
    cancelImport: 'インポートをキャンセル',
    cancelAnalysis: '解析をキャンセル',
    reAnalyze: '現在の設定で再解析',
    viewGuide: '使い方ガイド',
    processing: '処理中...',
    sendingToFigma: 'Figmaに送信中...',
    importComplete: 'インポート完了！',
    importCancelled: 'インポートがキャンセルされました。',
    cancelling: 'キャンセル中...',
    analysisComplete: '解析完了！',
    noValidImages: '有効な画像が見つかりませんでした。',
    noImageFiles: '画像ファイルが選択されていません',
    noImageInFolder: 'フォルダ内に画像ファイルが見つかりません',
    folderParseError: 'フォルダ構造を解析できませんでした。セクションフォルダを含む親フォルダを選択してください。',
    loadingImage: '画像読み込み中 {n}/{total}...',
    detectingScroll: 'スクロール検出中... ({n}/{total})',
    detectingSection: 'セクション区切り検出中... ({n}/{total})',
    processingFile: '処理中: {name}',
    largeFileWarning: '{count}枚の画像を選択しました。解析に時間がかかる場合があります。続けますか？',
    skippedFiles: '{count}件の非画像ファイルをスキップしました。',
    detectedSummary: '<strong>{sections}</strong>セクション、<strong>{scrollGroups}</strong>スクロールグループを<strong>{total}</strong>枚のスクリーンショットから検出。',
    loadErrorsSuffix: ' <span style="color:var(--error-text);">{count}枚の画像が読み込めずスキップされました。</span>',
    statsSummary: '<strong>{sections}</strong>セクション、<strong>{scrollGroups}</strong>スクロールグループ、<strong>{screens}</strong>画面',
    folderStats: '<strong>{sections}</strong>セクション、<strong>{folders}</strong>オートレイアウト、<strong>{files}</strong>画像',
    screens: '画面',
    screen: '画面',
    geminiApiKeyLabel: 'Gemini APIキー',
    optionalBadge: '（任意）',
    geminiApiKeyHint: '無料 — AIがスクリーンショットからセクション名を提案。キー未設定時はファイル名から推定のみ。',
    getApiKey: '無料APIキーを取得 →',
    aiSuggesting: 'AIがセクション名を提案中...',
    aiSuggestDone: 'AIが{count}件のセクション名を提案しました',
    aiSuggestError: 'AI提案に失敗 — ファイル名から推定',
    aiSuggestNoKey: '',
  }
};

let lang = 'en';
try { lang = localStorage.getItem('bsi-lang') || 'en'; } catch (e) {}

function t(key: string, params?: Record<string, string | number>) {
  let text = (TEXTS[lang as keyof typeof TEXTS] && TEXTS[lang as keyof typeof TEXTS][key as keyof (typeof TEXTS)['en']]) || TEXTS.en[key as keyof typeof TEXTS.en] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.split('{' + k + '}').join(String(v));
    }
  }
  return text;
}

function setLang(newLang: string) {
  lang = newLang;
  try { localStorage.setItem('bsi-lang', lang); } catch (e) {}
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-option').forEach(btn => {
    const isActive = (btn as HTMLElement).dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-checked', String(isActive));
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = (el as HTMLElement).dataset.i18n;
    const val = t(key!);
    if (val.includes('<')) (el as HTMLElement).innerHTML = val;
    else (el as HTMLElement).textContent = val;
  });
}

// Keep toggleLang for backward compatibility
function toggleLang() { setLang(lang === 'en' ? 'ja' : 'en'); }

// Initialize language + settings on load
setLang(lang);
initGeminiApiKeyField();

// ================================================================
// Utilities
// ================================================================

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ================================================================
// Gemini AI — Section Name Suggestion
// ================================================================

function getGeminiApiKey(): string {
  try { return localStorage.getItem('bsi-gemini-key') || ''; } catch { return ''; }
}

function saveGeminiApiKey(key: string) {
  try { localStorage.setItem('bsi-gemini-key', key.trim()); } catch {}
}

function toggleApiKeyVisibility() {
  const input = document.getElementById('geminiApiKey') as HTMLInputElement;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  input.parentElement?.querySelector('.api-key-toggle')?.classList.toggle('api-key-visible', isPassword);
}

function initGeminiApiKeyField() {
  const key = getGeminiApiKey();
  const input = document.getElementById('geminiApiKey') as HTMLInputElement;
  if (input && key) input.value = key;
}

async function suggestSectionNamesWithAI(
  sections: Array<{ suggestedName: string; groups: Array<{ screens: number[] }> }>,
  thumbnails: string[]
): Promise<string[]> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return [];

  const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];
  parts.push({
    text: `You are analyzing screenshots from a mobile app. For each numbered image below, provide a SHORT descriptive section label (1-3 words, e.g. "Home", "Login", "Settings", "Profile", "Search", "Registration", "Payment", "Map", "Booking", "Chat"). Reply with ONLY the labels, one per line, in the same order as the images. No numbering, no explanation.`
  });

  let imageCount = 0;
  for (let i = 0; i < sections.length; i++) {
    const firstScreenIdx = sections[i].groups[0]?.screens[0];
    if (firstScreenIdx == null || !thumbnails[firstScreenIdx]) continue;
    const dataUrl = thumbnails[firstScreenIdx];
    const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const mimeMatch = dataUrl.match(/^data:(image\/\w+);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
    parts.push({ text: `Image ${i + 1}:` });
    parts.push({ inlineData: { mimeType, data: base64 } });
    imageCount++;
  }

  if (imageCount === 0) return [];

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts }] })
    }
  );

  if (!resp.ok) {
    const errText = await resp.text().catch(() => '');
    throw new Error(`Gemini API error ${resp.status}: ${errText.slice(0, 200)}`);
  }

  const data = await resp.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const labels = text.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0 && l.length < 40);
  return labels;
}

// ================================================================
// Mode Switching (with ARIA + keyboard)
// ================================================================

let currentMode = 'folder';
const tabKeys = ['folder', 'smart'];

function switchMode(mode: string) {
  currentMode = mode;
  tabKeys.forEach(key => {
    const tab = document.getElementById('tab' + key.charAt(0).toUpperCase() + key.slice(1));
    const panel = document.getElementById(key + 'Mode');
    const isActive = key === mode;
    tab!.setAttribute('aria-selected', String(isActive));
    tab!.tabIndex = isActive ? 0 : -1;
    panel!.classList.toggle('active', isActive);
  });
}

document.querySelector('.mode-tabs')!.addEventListener('keydown', (e: KeyboardEvent) => {
  const idx = tabKeys.indexOf(currentMode);
  let newIdx = idx;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { newIdx = (idx + 1) % tabKeys.length; }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { newIdx = (idx - 1 + tabKeys.length) % tabKeys.length; }
  else if (e.key === 'Home') { newIdx = 0; }
  else if (e.key === 'End') { newIdx = tabKeys.length - 1; }
  else { return; }
  e.preventDefault();
  switchMode(tabKeys[newIdx]);
  document.getElementById('tab' + tabKeys[newIdx].charAt(0).toUpperCase() + tabKeys[newIdx].slice(1))!.focus();
});

// ================================================================
// Cancel Support
// ================================================================

let cancelFlags = { folder: false, smart: false, analysis: false };
function cancelImport(mode: string) {
  cancelFlags[mode as keyof typeof cancelFlags] = true;
  if (mode === 'analysis') {
    (document.getElementById('cancelAnalysisBtn') as HTMLButtonElement).disabled = true;
    document.getElementById('analysisProgressText')!.textContent = t('cancelling');
  }
}
function resetCancel(mode: string) { cancelFlags[mode as keyof typeof cancelFlags] = false; }

// ================================================================
// Shared: Image Processing
// ================================================================

function getImageWidth() {
  const id = currentMode === 'smart' ? 'smartImageWidth' : 'imageWidth';
  return parseInt((document.getElementById(id) as HTMLInputElement).value) || 360;
}

function getMaxChunkHeight() {
  const id = currentMode === 'smart' ? 'smartMaxChunkHeight' : 'maxChunkHeight';
  return parseInt((document.getElementById(id) as HTMLInputElement).value) || 4096;
}

async function processImage(file: File) {
  return new Promise<{ chunks: Array<{ originalWidth: number; originalHeight: number; displayWidth: number; displayHeight: number; data: string }>; displayWidth: number; displayHeight: number }>((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error(`Failed to load image: ${file.name}`)); };
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const displayWidth = getImageWidth();
      const maxChunkSize = getMaxChunkHeight();
      const originalWidth = img.width;
      const originalHeight = img.height;
      const displayScale = displayWidth / originalWidth;
      const displayHeight = Math.round(originalHeight * displayScale);
      const chunks: Array<{ originalWidth: number; originalHeight: number; displayWidth: number; displayHeight: number; data: string }> = [];
      const numChunks = Math.ceil(originalHeight / maxChunkSize);
      for (let i = 0; i < numChunks; i++) {
        const chunkCanvas = document.createElement('canvas');
        const chunkCtx = chunkCanvas.getContext('2d')!;
        const startY = i * maxChunkSize;
        const chunkHeight = Math.min(maxChunkSize, originalHeight - startY);
        chunkCanvas.width = originalWidth;
        chunkCanvas.height = chunkHeight;
        chunkCtx.drawImage(img, 0, startY, originalWidth, chunkHeight, 0, 0, originalWidth, chunkHeight);
        chunks.push({
          originalWidth, originalHeight: chunkHeight,
          displayWidth, displayHeight: Math.round(chunkHeight * displayScale),
          data: chunkCanvas.toDataURL('image/png')
        });
      }
      resolve({ chunks, displayWidth, displayHeight });
    };
    img.src = objectUrl;
  });
}

// ================================================================
// Folder Import Mode
// ================================================================

let selectedFiles: File[] = [];
let folderStructure: Record<string, unknown> = {};

const dropZone = document.getElementById('dropZone')!;
const folderInput = document.getElementById('folderInput')! as HTMLInputElement;
const fileInput = document.getElementById('fileInput')! as HTMLInputElement;
const previewSection = document.getElementById('previewSection')!;
const preview = document.getElementById('preview')!;
const statsEl = document.getElementById('stats')!;
const importBtn = document.getElementById('importBtn')!;
const cancelFolderBtn = document.getElementById('cancelFolderBtn')!;
const progressEl = document.getElementById('progress')!;
const progressFill = document.getElementById('progressFill')!;
const progressText = document.getElementById('progressText')!;

dropZone.addEventListener('click', (e) => { e.stopPropagation(); folderInput.click(); });
dropZone.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); folderInput.click(); } });
folderInput.addEventListener('change', (e) => handleFiles((e.target as HTMLInputElement).files!));
fileInput.addEventListener('change', (e) => handleIndividualFiles((e.target as HTMLInputElement).files!));
importBtn.addEventListener('click', startFolderImport);

function handleIndividualFiles(files: FileList) {
  const imageFiles = Array.from(files).filter(f => {
    const name = f.name.toLowerCase();
    return !name.startsWith('.') && (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg'));
  });
  if (imageFiles.length === 0) { alert(t('noImageFiles')); return; }
  folderStructure = { 'imported-images': { _files: imageFiles.map(f => ({ name: f.name, file: f })) } };
  renderFolderPreview();
  previewSection.style.display = 'block';
  importBtn.removeAttribute('disabled');
}

function handleFiles(files: FileList) {
  selectedFiles = Array.from(files).filter(f => {
    const name = f.name.toLowerCase();
    return !name.startsWith('.') && (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg'));
  });
  if (selectedFiles.length === 0) { alert(t('noImageInFolder')); return; }
  folderStructure = buildFolderStructure(selectedFiles);
  if (Object.keys(folderStructure).length === 0) { alert(t('folderParseError')); return; }
  renderFolderPreview();
  previewSection.style.display = 'block';
  importBtn.removeAttribute('disabled');
}

function buildFolderStructure(files: File[]) {
  const structure: Record<string, unknown> = {};
  files.forEach(file => {
    const pathParts = (file as File & { webkitRelativePath?: string }).webkitRelativePath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    let sectionName: string, subfolders: string[];
    if (pathParts.length >= 3) { sectionName = pathParts[1]; subfolders = pathParts.slice(2, -1); }
    else if (pathParts.length === 2) { sectionName = pathParts[0]; subfolders = []; }
    else { return; }
    if (!structure[sectionName]) structure[sectionName] = {};
    let current = structure[sectionName] as Record<string, unknown>;
    if (subfolders.length === 0) {
      if (!current._files) current._files = [];
      (current._files as Array<{ name: string; file: File }>).push({ name: fileName, file: file });
    } else {
      subfolders.forEach(folder => { if (!current[folder]) current[folder] = {}; current = current[folder] as Record<string, unknown>; });
      if (!current._files) current._files = [];
      (current._files as Array<{ name: string; file: File }>).push({ name: fileName, file: file });
    }
  });
  return structure;
}

function renderFolderPreview() {
  let html = '';
  let totalFiles = 0, totalSections = 0, totalFolders = 0;
  function renderFolder(obj: Record<string, unknown>, indent = 0, isSection = false): string {
    let result = '';
    for (const [key, value] of Object.entries(obj)) {
      if (key === '_files') {
        (value as Array<{ name: string }>).forEach(f => { result += `<div class="preview-item preview-file" style="padding-left: ${indent + 12}px">\u{1F4C4} ${escapeHtml(f.name)}</div>`; totalFiles++; });
      } else {
        if (isSection) { result += `<div class="preview-item preview-section">\u{1F4C1} [Section] ${escapeHtml(key)}</div>`; totalSections++; }
        else { result += `<div class="preview-item preview-folder" style="padding-left: ${indent}px">\u{1F4C2} [AutoLayout] ${escapeHtml(key)}</div>`; totalFolders++; }
        result += renderFolder(value as Record<string, unknown>, indent + 12, false);
      }
    }
    return result;
  }
  html = renderFolder(folderStructure, 0, true);
  preview.innerHTML = html;
  statsEl.innerHTML = t('folderStats', { sections: totalSections, folders: totalFolders, files: totalFiles });
}

async function startFolderImport() {
  importBtn.setAttribute('disabled', '');
  cancelFolderBtn.style.display = 'block';
  progressEl.style.display = 'block';
  resetCancel('folder');
  const processedData = { structure: {} as Record<string, unknown>, settings: { imageWidth: getImageWidth(), maxChunkHeight: getMaxChunkHeight() } };
  let totalFiles = 0, processedFiles = 0, skippedFiles = 0;
  function countFiles(obj: Record<string, unknown>) { for (const [key, value] of Object.entries(obj)) { if (key === '_files') totalFiles += (value as unknown[]).length; else countFiles(value as Record<string, unknown>); } }
  countFiles(folderStructure);
  async function processFolder(source: Record<string, unknown>, target: Record<string, unknown>) {
    for (const [key, value] of Object.entries(source)) {
      if (cancelFlags.folder) return;
      if (key === '_files') {
        target._files = [];
        for (const fileInfo of value as Array<{ name: string; file: File }>) {
          if (cancelFlags.folder) return;
          progressText.textContent = t('processingFile', { name: fileInfo.name });
          try {
            const result = await processImage(fileInfo.file);
            (target._files as Array<{ name: string; chunks: unknown; displayWidth: number; displayHeight: number }>).push({ name: fileInfo.name, chunks: result.chunks, displayWidth: result.displayWidth, displayHeight: result.displayHeight });
          } catch (e) { console.warn('Skipping failed image:', fileInfo.name, e); skippedFiles++; }
          processedFiles++;
          const pct = (processedFiles / totalFiles) * 100;
          progressFill.style.width = `${pct}%`;
          progressEl.setAttribute('aria-valuenow', String(Math.round(pct)));
        }
      } else { target[key] = {}; await processFolder(value as Record<string, unknown>, target[key] as Record<string, unknown>); }
    }
  }
  await processFolder(folderStructure, processedData.structure);
  cancelFolderBtn.style.display = 'none';
  if (cancelFlags.folder) {
    progressText.textContent = t('importCancelled');
    progressFill.style.width = '0%';
    setTimeout(() => { progressEl.style.display = 'none'; importBtn.removeAttribute('disabled'); }, 1500);
    return;
  }
  progressText.textContent = t('sendingToFigma');
  parent.postMessage({ pluginMessage: { type: 'import', data: processedData, skippedFiles } }, '*');
}

// ================================================================
// Smart Import Mode
// ================================================================

const COMPARE_WIDTH = 120;
const MAX_FILES_WARNING = 200;

let smartRawFiles: File[] = [];
let smartCompData: Array<{ width: number; height: number; data: Uint8ClampedArray; thumbDataUrl: string } | null> = [];
let smartThumbnails: string[] = [];
let smartSections: Array<{ name: string; suggestedName: string; groups: Array<{ screens: number[]; isScrollGroup: boolean }> }> = [];

const smartDropZone = document.getElementById('smartDropZone')!;
const smartFileInput = document.getElementById('smartFileInput')! as HTMLInputElement;
const smartSkippedNotice = document.getElementById('smartSkippedNotice')!;
const smartAnalysisSection = document.getElementById('smartAnalysisSection')!;
const analysisProgressFill = document.getElementById('analysisProgressFill')!;
const analysisProgressText = document.getElementById('analysisProgressText')!;
const smartPreviewSection = document.getElementById('smartPreviewSection')!;
const analysisInfo = document.getElementById('analysisInfo')!;
const smartPreview = document.getElementById('smartPreview')!;
const smartStatsEl = document.getElementById('smartStats')!;
const smartImportBtn = document.getElementById('smartImportBtn')!;
const cancelSmartBtn = document.getElementById('cancelSmartBtn')!;
const smartProgressEl = document.getElementById('smartProgress')!;
const smartProgressFill = document.getElementById('smartProgressFill')!;
const smartProgressText = document.getElementById('smartProgressText')!;

smartDropZone.addEventListener('click', (e) => { e.stopPropagation(); smartFileInput.click(); });
smartDropZone.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); smartFileInput.click(); } });
smartDropZone.addEventListener('dragover', (e) => { e.preventDefault(); smartDropZone.classList.add('drag-over'); });
smartDropZone.addEventListener('dragleave', () => { smartDropZone.classList.remove('drag-over'); });
smartDropZone.addEventListener('drop', (e) => {
  e.preventDefault(); smartDropZone.classList.remove('drag-over');
  if (e.dataTransfer!.files.length > 0) handleSmartFiles(e.dataTransfer!.files);
});
smartFileInput.addEventListener('change', (e) => handleSmartFiles((e.target as HTMLInputElement).files!));
smartImportBtn.addEventListener('click', startSmartImport);

function handleSmartFiles(files: FileList) {
  const allFiles = Array.from(files);
  const imageFiles = allFiles.filter(f => {
    const name = f.name.toLowerCase();
    return !name.startsWith('.') && (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg'));
  });
  const skipped = allFiles.length - imageFiles.length;
  smartSkippedNotice.innerHTML = skipped > 0
    ? `<div class="skipped-notice">${escapeHtml(t('skippedFiles', { count: skipped }))}</div>` : '';
  if (imageFiles.length === 0) { alert(t('noImageFiles')); return; }
  smartRawFiles = imageFiles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
  if (smartRawFiles.length > MAX_FILES_WARNING) {
    if (!confirm(t('largeFileWarning', { count: smartRawFiles.length }))) return;
  }
  analyzeScreenshots();
}

function loadImageData(file: File) {
  return new Promise<{ width: number; height: number; data: Uint8ClampedArray; thumbDataUrl: string }>((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error(`Failed to load: ${file.name}`)); };
    img.onload = () => {
      const scale = COMPARE_WIDTH / img.width;
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = COMPARE_WIDTH; canvas.height = h;
      canvas.getContext('2d')!.drawImage(img, 0, 0, COMPARE_WIDTH, h);
      const imageData = canvas.getContext('2d')!.getImageData(0, 0, COMPARE_WIDTH, h);
      const thumbCanvas = document.createElement('canvas');
      const thumbW = 48, thumbH = Math.round(img.height * (thumbW / img.width));
      thumbCanvas.width = thumbW; thumbCanvas.height = thumbH;
      thumbCanvas.getContext('2d')!.drawImage(img, 0, 0, thumbW, thumbH);
      URL.revokeObjectURL(objectUrl);
      resolve({ width: COMPARE_WIDTH, height: h, data: imageData.data, thumbDataUrl: thumbCanvas.toDataURL('image/jpeg', 0.6) });
    };
    img.src = objectUrl;
  });
}

function stripHasEnoughDetail(data: Uint8ClampedArray, w: number, startY: number, h: number): boolean {
  // Compute per-channel variance across the strip; if too low, it's ~solid color
  let sumR = 0, sumG = 0, sumB = 0, n = 0;
  for (let row = 0; row < h; row += 2) {
    for (let col = 0; col < w; col += 2) {
      const idx = ((startY + row) * w + col) * 4;
      sumR += data[idx]; sumG += data[idx + 1]; sumB += data[idx + 2]; n++;
    }
  }
  const avgR = sumR / n, avgG = sumG / n, avgB = sumB / n;
  let varSum = 0;
  for (let row = 0; row < h; row += 2) {
    for (let col = 0; col < w; col += 2) {
      const idx = ((startY + row) * w + col) * 4;
      varSum += (data[idx] - avgR) ** 2 + (data[idx + 1] - avgG) ** 2 + (data[idx + 2] - avgB) ** 2;
    }
  }
  const variance = varSum / (n * 3);
  // Threshold: if variance < 80, strip is nearly solid → unreliable for matching
  return variance >= 80;
}

function isScrollContinuation(compA: { width: number; height: number; data: Uint8ClampedArray }, compB: { width: number; height: number; data: Uint8ClampedArray }, sensitivity: number) {
  const w = compA.width, hA = compA.height, hB = compB.height;
  if (hA < 20 || hB < 20) return false;
  const navBarH = Math.max(4, Math.floor(hA * 0.12));
  const statusBarH = Math.max(2, Math.floor(hB * 0.06));
  const stripH = Math.min(30, Math.floor(hA * 0.15));
  if (stripH < 5) return false;
  const stripStartA = Math.max(0, hA - navBarH - stripH);

  // Guard: if the strip is nearly solid color, skip — matching would be unreliable
  if (!stripHasEnoughDetail(compA.data, w, stripStartA, stripH)) return false;

  const searchEnd = Math.min(hB, Math.floor(hB * 0.65));
  let bestSim = 0;
  for (let yB = statusBarH; yB <= searchEnd - stripH; yB += 2) {
    let totalDiff = 0, pixelCount = 0;
    for (let row = 0; row < stripH; row++) {
      for (let col = 0; col < w; col++) {
        const idxA = ((stripStartA + row) * w + col) * 4;
        const idxB = ((yB + row) * w + col) * 4;
        totalDiff += (Math.abs(compA.data[idxA] - compB.data[idxB]) + Math.abs(compA.data[idxA+1] - compB.data[idxB+1]) + Math.abs(compA.data[idxA+2] - compB.data[idxB+2])) / (3 * 255);
        pixelCount++;
      }
    }
    const sim = 1 - (totalDiff / pixelCount);
    if (sim > bestSim) bestSim = sim;
    if (bestSim > sensitivity + 0.03) break;
  }
  return bestSim >= sensitivity;
}

function isSectionBreak(compA: { width: number; height: number; data: Uint8ClampedArray }, compB: { width: number; height: number; data: Uint8ClampedArray }, sensitivity: number) {
  const w = compA.width, hA = compA.height, hB = compB.height;
  if (hA < 10 || hB < 10) return true;
  const navH = Math.max(4, Math.floor(Math.min(hA, hB) * 0.13));
  let navDiff = 0, navPixels = 0;
  for (let row = 0; row < navH; row++) {
    for (let col = 0; col < w; col++) {
      const idxA = ((hA - navH + row) * w + col) * 4;
      const idxB = ((hB - navH + row) * w + col) * 4;
      navDiff += (Math.abs(compA.data[idxA] - compB.data[idxB]) + Math.abs(compA.data[idxA+1] - compB.data[idxB+1]) + Math.abs(compA.data[idxA+2] - compB.data[idxB+2])) / (3 * 255);
      navPixels++;
    }
  }
  const navSimilarity = 1 - (navDiff / navPixels);
  let overallDiff = 0, overallPixels = 0;
  for (let s = 0; s < 10; s++) {
    const rowA = Math.floor((hA * (s + 1)) / 11);
    const rowB = Math.floor((hB * (s + 1)) / 11);
    for (let col = 0; col < w; col += 2) {
      const idxA = (rowA * w + col) * 4;
      const idxB = (rowB * w + col) * 4;
      overallDiff += (Math.abs(compA.data[idxA] - compB.data[idxB]) + Math.abs(compA.data[idxA+1] - compB.data[idxB+1]) + Math.abs(compA.data[idxA+2] - compB.data[idxB+2])) / (3 * 255);
      overallPixels++;
    }
  }
  const overallSimilarity = 1 - (overallDiff / overallPixels);
  return navSimilarity < sensitivity || overallSimilarity < Math.max(0.3, sensitivity - 0.25);
}

async function analyzeScreenshots() {
  smartAnalysisSection.style.display = 'block';
  smartPreviewSection.style.display = 'none';
  smartImportBtn.setAttribute('disabled', '');
  (smartAnalysisSection.querySelector('.progress') as HTMLElement).style.display = 'block';
  (document.getElementById('cancelAnalysisBtn') as HTMLButtonElement).disabled = false;
  resetCancel('analysis');
  const scrollSens = parseFloat((document.getElementById('scrollSensitivity') as HTMLInputElement).value);
  const sectionSens = parseFloat((document.getElementById('sectionSensitivity') as HTMLInputElement).value);

  smartCompData = []; smartThumbnails = [];
  let loadErrors = 0;
  for (let i = 0; i < smartRawFiles.length; i++) {
    if (cancelFlags.analysis) { finishCancelledAnalysis(); return; }
    analysisProgressText.textContent = t('loadingImage', { n: i + 1, total: smartRawFiles.length });
    const pct = ((i + 1) / smartRawFiles.length) * 50;
    analysisProgressFill.style.width = `${pct}%`;
  smartAnalysisSection.querySelector('[role=progressbar]')?.setAttribute('aria-valuenow', String(Math.round(pct)));
    try {
      const data = await loadImageData(smartRawFiles[i]);
      smartCompData.push(data); smartThumbnails.push(data.thumbDataUrl);
    } catch (e) { console.warn('Skipping failed image:', smartRawFiles[i].name, e); smartCompData.push(null); smartThumbnails.push(''); loadErrors++; }
  }
  if (cancelFlags.analysis) { finishCancelledAnalysis(); return; }

  const validIndices: number[] = [];
  for (let i = 0; i < smartCompData.length; i++) { if (smartCompData[i] !== null) validIndices.push(i); }
  if (validIndices.length === 0) {
    analysisProgressText.textContent = t('noValidImages');
    setTimeout(() => { smartAnalysisSection.style.display = 'none'; }, 2000);
    return;
  }

  const totalPairs = validIndices.length - 1;
  const scrollFlags = new Map<string, boolean>();
  for (let idx = 0; idx < totalPairs; idx++) {
    if (cancelFlags.analysis) { finishCancelledAnalysis(); return; }
    const i = validIndices[idx], j = validIndices[idx + 1];
    const pct = 50 + (idx / totalPairs) * 25;
    analysisProgressText.textContent = t('detectingScroll', { n: idx + 1, total: totalPairs });
    analysisProgressFill.style.width = `${pct}%`;
    scrollFlags.set(`${i}-${j}`, isScrollContinuation(smartCompData[i]!, smartCompData[j]!, scrollSens));
    if (idx % 5 === 0) await new Promise(r => setTimeout(r, 0));
  }
  if (cancelFlags.analysis) { finishCancelledAnalysis(); return; }

  const groups: Array<{ screens: number[]; isScrollGroup: boolean }> = [];
  let currentGroup = { screens: [validIndices[0]], isScrollGroup: false };
  for (let idx = 0; idx < totalPairs; idx++) {
    const i = validIndices[idx], j = validIndices[idx + 1];
    if (scrollFlags.get(`${i}-${j}`)) { currentGroup.screens.push(j); currentGroup.isScrollGroup = currentGroup.screens.length > 1; }
    else { groups.push(currentGroup); currentGroup = { screens: [j], isScrollGroup: false }; }
  }
  groups.push(currentGroup);

  const sectionBreaks = [0];
  for (let i = 1; i < groups.length; i++) {
    if (cancelFlags.analysis) { finishCancelledAnalysis(); return; }
    const pct = 75 + (i / groups.length) * 20;
    analysisProgressText.textContent = t('detectingSection', { n: i, total: groups.length });
    analysisProgressFill.style.width = `${pct}%`;
    const prevRepIdx = groups[i - 1].screens[0], currRepIdx = groups[i].screens[0];
    if (smartCompData[prevRepIdx] && smartCompData[currRepIdx] && isSectionBreak(smartCompData[prevRepIdx]!, smartCompData[currRepIdx]!, sectionSens)) {
      sectionBreaks.push(i);
    }
    if (i % 5 === 0) await new Promise(r => setTimeout(r, 0));
  }

  smartSections = [];
  const usedNames = new Set<string>();
  for (let s = 0; s < sectionBreaks.length; s++) {
    const startGroup = sectionBreaks[s];
    const endGroup = s + 1 < sectionBreaks.length ? sectionBreaks[s + 1] : groups.length;
    const sectionGroups = groups.slice(startGroup, endGroup);
    const suggested = suggestSectionName({ groups: sectionGroups }, usedNames);
    if (suggested) usedNames.add(suggested);
    smartSections.push({ name: '', suggestedName: suggested || `Section ${s + 1}`, groups: sectionGroups });
  }

  analysisProgressFill.style.width = '95%';
  analysisProgressText.textContent = t('analysisComplete');

  // Try AI-based section name suggestions if API key is available
  if (getGeminiApiKey()) {
    analysisProgressText.textContent = t('aiSuggesting');
    try {
      const aiLabels = await suggestSectionNamesWithAI(smartSections, smartThumbnails);
      let applied = 0;
      for (let i = 0; i < Math.min(aiLabels.length, smartSections.length); i++) {
        if (aiLabels[i]) { smartSections[i].suggestedName = aiLabels[i]; applied++; }
      }
      if (applied > 0) {
        analysisProgressText.textContent = t('aiSuggestDone', { count: applied });
      }
    } catch (e) {
      console.warn('AI section suggestion failed:', e);
      analysisProgressText.textContent = t('aiSuggestError');
    }
  }

  analysisProgressFill.style.width = '100%';
  setTimeout(() => {
    smartAnalysisSection.style.display = 'none';
    renderSmartPreview(loadErrors);
    smartPreviewSection.style.display = 'block';
    smartImportBtn.removeAttribute('disabled');
  }, 500);
}

function finishCancelledAnalysis() {
  (smartAnalysisSection.querySelector('.progress') as HTMLElement).style.display = 'none';
  smartAnalysisSection.style.display = 'none';
  analysisProgressFill.style.width = '0%';
}

function reAnalyze() { if (smartRawFiles.length === 0) return; analyzeScreenshots(); }

const SECTION_KEYWORDS: Array<{ label: string; keywords: string[] }> = [
  { label: 'Splash', keywords: ['splash', 'launch', 'intro', 'welcome', 'tutorial'] },
  { label: 'App Store', keywords: ['appstore', 'app_store', 'app-store', 'store', 'download', 'install'] },
  { label: 'Login', keywords: ['login', 'signin', 'sign_in', 'sign-in', 'log-in', 'log_in'] },
  { label: 'Registration', keywords: ['register', 'signup', 'sign_up', 'sign-up', 'onboarding', 'create_account'] },
  { label: 'Home', keywords: ['home', 'top', 'main', 'feed', 'timeline', 'dashboard'] },
  { label: 'Search', keywords: ['search', 'explore', 'discover', 'find', 'browse'] },
  { label: 'Map', keywords: ['map', 'location', 'gps', 'navigate', 'navigation', 'ride', 'trip'] },
  { label: 'Booking', keywords: ['booking', 'book', 'reserve', 'reservation', 'schedule'] },
  { label: 'Chat', keywords: ['chat', 'message', 'dm', 'inbox', 'conversation', 'msg'] },
  { label: 'Notifications', keywords: ['notification', 'alert', 'notice', 'notif'] },
  { label: 'Profile', keywords: ['profile', 'account', 'mypage', 'my_page', 'my-page', 'user'] },
  { label: 'Settings', keywords: ['settings', 'setting', 'config', 'preference', 'pref'] },
  { label: 'Payment', keywords: ['payment', 'pay', 'checkout', 'cart', 'billing', 'wallet'] },
  { label: 'Detail', keywords: ['detail', 'item', 'product', 'article', 'post', 'single'] },
  { label: 'List', keywords: ['list', 'catalog', 'gallery', 'collection'] },
  { label: 'Menu', keywords: ['menu', 'nav', 'sidebar', 'drawer', 'hamburger'] },
  { label: 'Camera', keywords: ['camera', 'photo', 'capture', 'scan', 'qr'] },
  { label: 'History', keywords: ['history', 'log', 'activity', 'recent', 'order'] },
  { label: 'Favorites', keywords: ['favorite', 'fav', 'saved', 'bookmark', 'like', 'wishlist'] },
  { label: 'Help', keywords: ['help', 'support', 'faq', 'contact', 'about'] },
];

function suggestSectionName(section: { groups: Array<{ screens: number[] }> }, usedNames: Set<string>): string {
  const filenames: string[] = [];
  section.groups.forEach(g => g.screens.forEach(idx => {
    if (smartRawFiles[idx]) filenames.push(smartRawFiles[idx].name.toLowerCase().replace(/\.[^.]+$/, ''));
  }));
  if (filenames.length === 0) return '';

  // Score each keyword category by how many filenames match
  const scores: Array<{ label: string; score: number }> = [];
  for (const cat of SECTION_KEYWORDS) {
    let score = 0;
    for (const fn of filenames) {
      for (const kw of cat.keywords) {
        if (fn.includes(kw)) { score++; break; }
      }
    }
    if (score > 0) scores.push({ label: cat.label, score });
  }
  scores.sort((a, b) => b.score - a.score);

  // Pick the top match that hasn't been used yet
  for (const s of scores) {
    if (!usedNames.has(s.label)) return s.label;
  }

  // Fallback: try to find a common non-numeric word across filenames
  const wordCounts = new Map<string, number>();
  const stopWords = new Set(['img', 'image', 'screenshot', 'screen', 'photo', 'pic', 'capture', 'shot', 'iphone', 'android', 'pixel', 'samsung', 'simulator', 'png', 'jpg', 'jpeg', 'at', 'am', 'pm']);
  for (const fn of filenames) {
    const words = fn.split(/[\s_\-./\\()[\]{}]+/).filter(w => w.length >= 3 && !/^\d+$/.test(w) && !stopWords.has(w));
    const seen = new Set<string>();
    for (const w of words) {
      if (!seen.has(w)) { wordCounts.set(w, (wordCounts.get(w) || 0) + 1); seen.add(w); }
    }
  }
  // Find the word that appears in the most filenames (at least 2)
  let bestWord = '', bestCount = 1;
  for (const [word, count] of wordCounts) {
    if (count > bestCount && !usedNames.has(capitalize(word))) { bestWord = word; bestCount = count; }
  }
  if (bestWord) return capitalize(bestWord);

  return '';
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function renderSmartPreview(loadErrors: number) {
  let totalScreens = 0, scrollGroupCount = 0;
  let html = '';
  smartSections.forEach((section, sIdx) => {
    let sectionScreenCount = 0;
    section.groups.forEach(g => { sectionScreenCount += g.screens.length; if (g.isScrollGroup) scrollGroupCount++; });
    totalScreens += sectionScreenCount;
    const screenWord = sectionScreenCount > 1 ? t('screens') : t('screen');
    html += `<div class="smart-section">`;
    html += `<div class="smart-section-header">`;
    html += `<span class="section-badge">Section</span>`;
    html += `<div class="section-name-wrapper">`;
    html += `<input type="text" class="section-name-input" value="${escapeHtml(section.name)}" placeholder="${escapeHtml(section.suggestedName)}" data-section-idx="${sIdx}" onchange="updateSectionName(${sIdx}, this.value)" onfocus="showAcceptHint(this)" onblur="hideAcceptHint(this)" onkeydown="handleSectionNameKey(event, ${sIdx})" aria-label="Section name">`;
    html += `<span class="section-accept-hint" aria-hidden="true">Tab ↵</span>`;
    html += `</div>`;
    html += `<span class="smart-section-count">${sectionScreenCount} ${escapeHtml(screenWord)}</span>`;
    html += `</div>`;
    html += `<div class="smart-section-thumbs">`;
    section.groups.forEach(group => {
      const cls = group.isScrollGroup ? 'smart-group-wrapper scroll-group' : 'smart-group-wrapper';
      html += `<div class="${cls}">`;
      group.screens.forEach(screenIdx => {
        const thumbSrc = smartThumbnails[screenIdx] || '';
        const fileName = smartRawFiles[screenIdx] ? smartRawFiles[screenIdx].name : '';
        if (thumbSrc) html += `<img src="${thumbSrc}" class="smart-thumb" title="${escapeHtml(fileName)}" alt="${escapeHtml(fileName)}">`;
      });
      html += `</div>`;
    });
    html += `</div></div>`;
  });
  smartPreview.innerHTML = html;
  let infoHtml = t('detectedSummary', { sections: smartSections.length, scrollGroups: scrollGroupCount, total: smartRawFiles.length });
  if (loadErrors > 0) infoHtml += t('loadErrorsSuffix', { count: loadErrors });
  analysisInfo.innerHTML = infoHtml;
  smartStatsEl.innerHTML = t('statsSummary', { sections: smartSections.length, scrollGroups: scrollGroupCount, screens: totalScreens });
}

function updateSectionName(idx: number, name: string) {
  if (idx >= 0 && idx < smartSections.length) smartSections[idx].name = name;
}

function handleSectionNameKey(e: KeyboardEvent, idx: number) {
  const input = e.target as HTMLInputElement;
  if ((e.key === 'Tab' || e.key === 'Enter') && !input.value && input.placeholder) {
    e.preventDefault();
    input.value = input.placeholder;
    updateSectionName(idx, input.placeholder);
    hideAcceptHint(input);
    input.blur();
  }
}

function showAcceptHint(input: HTMLInputElement) {
  if (!input.value && input.placeholder) {
    const hint = input.parentElement?.querySelector('.section-accept-hint') as HTMLElement;
    if (hint) hint.style.opacity = '1';
  }
}

function hideAcceptHint(input: HTMLInputElement) {
  const hint = input.parentElement?.querySelector('.section-accept-hint') as HTMLElement;
  if (hint) hint.style.opacity = '0';
}

async function startSmartImport() {
  smartImportBtn.setAttribute('disabled', '');
  cancelSmartBtn.style.display = 'block';
  smartProgressEl.style.display = 'block';
  resetCancel('smart');
  const processedSections: Array<{ name: string; groups: Array<{ screens: Array<{ name: string; chunks: unknown; displayWidth: number; displayHeight: number }>; isScrollGroup: boolean }> }> = [];
  let totalScreens = 0, skippedFiles = 0;
  smartSections.forEach(s => s.groups.forEach(g => totalScreens += g.screens.length));
  let processedCount = 0;
  for (const section of smartSections) {
    if (cancelFlags.smart) break;
    const processedGroups: Array<{ screens: Array<{ name: string; chunks: unknown; displayWidth: number; displayHeight: number }>; isScrollGroup: boolean }> = [];
    for (const group of section.groups) {
      if (cancelFlags.smart) break;
      const processedScreens: Array<{ name: string; chunks: unknown; displayWidth: number; displayHeight: number }> = [];
      for (const screenIdx of group.screens) {
        if (cancelFlags.smart) break;
        smartProgressText.textContent = t('processingFile', { name: smartRawFiles[screenIdx].name });
        try {
          const result = await processImage(smartRawFiles[screenIdx]);
          processedScreens.push({ name: smartRawFiles[screenIdx].name, chunks: result.chunks, displayWidth: result.displayWidth, displayHeight: result.displayHeight });
        } catch (e) { console.warn('Skipping failed image:', smartRawFiles[screenIdx].name, e); skippedFiles++; }
        processedCount++;
        const pct = (processedCount / totalScreens) * 100;
        smartProgressFill.style.width = `${pct}%`;
        smartProgressEl.setAttribute('aria-valuenow', String(Math.round(pct)));
      }
      processedGroups.push({ screens: processedScreens, isScrollGroup: group.isScrollGroup });
    }
    const sectionName = section.name || section.suggestedName || `Section ${smartSections.indexOf(section) + 1}`;
    processedSections.push({ name: sectionName, groups: processedGroups });
  }
  cancelSmartBtn.style.display = 'none';
  if (cancelFlags.smart) {
    smartProgressText.textContent = t('importCancelled');
    smartProgressFill.style.width = '0%';
    setTimeout(() => { smartProgressEl.style.display = 'none'; smartImportBtn.removeAttribute('disabled'); }, 1500);
    return;
  }
  smartProgressText.textContent = t('sendingToFigma');
  parent.postMessage({
    pluginMessage: {
      type: 'smart-import',
      data: { sections: processedSections, settings: { imageWidth: getImageWidth(), sectionGap: 100, groupGap: 8, scrollGap: 0 } },
      skippedFiles
    }
  }, '*');
}

// ================================================================
// Shared: Message Handling from Figma
// ================================================================

window.onmessage = (event: MessageEvent) => {
  const msg = event.data.pluginMessage;
  if (!msg) return;
  const pFill = currentMode === 'smart' ? smartProgressFill : progressFill;
  const pText = currentMode === 'smart' ? smartProgressText : progressText;
  const pEl = currentMode === 'smart' ? smartProgressEl : progressEl;
  const btn = currentMode === 'smart' ? smartImportBtn : importBtn;
  if (msg.type === 'progress') {
    pText.textContent = msg.text;
    if (msg.percent !== undefined) pFill.style.width = `${msg.percent}%`;
  } else if (msg.type === 'complete') {
    pText.textContent = t('importComplete');
    pFill.style.width = '100%';
    setTimeout(() => { pEl.style.display = 'none'; btn.removeAttribute('disabled'); }, 2000);
  } else if (msg.type === 'error') {
    pText.textContent = `Error: ${msg.text}`;
    btn.removeAttribute('disabled');
  }
};

// Expose global functions for inline HTML handlers
(window as any).switchMode = switchMode;
(window as any).cancelImport = cancelImport;
(window as any).reAnalyze = reAnalyze;
(window as any).toggleLang = toggleLang;
(window as any).setLang = setLang;
(window as any).updateSectionName = updateSectionName;
(window as any).handleSectionNameKey = handleSectionNameKey;
(window as any).showAcceptHint = showAcceptHint;
(window as any).hideAcceptHint = hideAcceptHint;
(window as any).saveGeminiApiKey = saveGeminiApiKey;
(window as any).toggleApiKeyVisibility = toggleApiKeyVisibility;
