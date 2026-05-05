// ================================================================
// i18n
// ================================================================

const TEXTS = {
  en: {
    clickSelectFolder: 'Click to select folder',
    dropHint: 'or drop image files here (not folders)',
    chooseFiles: 'Choose individual files',
    orDivider: 'or',
    previewTitle: 'Preview',
    settingsTitle: 'Settings',
    imageWidth: 'Image Width (px)',
    useOriginalWidth: 'Use original image width',
    useOriginalWidthHint: 'Ignore Image Width — keep each image at its natural pixel width (for responsive screenshots)',
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
    folderDropNotSupported: 'Folder drop is not supported in Figma plugins.\nPlease use "Click to select folder" above, or drop individual image files instead.',
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
    sectionNamePlaceholder: 'e.g. product-photos',
    filesReady: '{count} images ready',
    addMoreFolders: 'Click to add more folders',
    clearAll: 'Clear all',
    changeSelection: 'Click to change selection',
  },
  ja: {
    clickSelectFolder: 'クリックしてフォルダを選択',
    dropHint: 'または画像ファイルをここにドロップ（フォルダ不可）',
    chooseFiles: '個別のファイルを選択',
    orDivider: 'または',
    previewTitle: 'プレビュー',
    settingsTitle: '設定',
    imageWidth: '画像の幅 (px)',
    useOriginalWidth: '元の画像の幅を保持',
    useOriginalWidthHint: '画像の幅を無視し、各画像を元の幅のままインポート（レスポンシブ用）',
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
    folderDropNotSupported: 'Figmaプラグインではフォルダのドロップに対応していません。\n上の「クリックしてフォルダを選択」を使うか、画像ファイルを直接ドロップしてください。',
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
    sectionNamePlaceholder: '例: 商品写真',
    filesReady: '{count}枚の画像を読み込み済み',
    addMoreFolders: 'クリックしてフォルダを追加',
    clearAll: 'すべてクリア',
    changeSelection: 'クリックして選択を変更',
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

setLang(lang);

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
// Import Mode Tracking
// ================================================================

let currentImportMode: 'folder' | 'smart' = 'folder';

function showSmartSettings(visible: boolean) {
  document.querySelectorAll('.smart-only-settings').forEach(el => {
    (el as HTMLElement).style.display = visible ? '' : 'none';
  });
}

// ================================================================
// Shared: Image Processing
// ================================================================

function getImageWidth() {
  return parseInt((document.getElementById('imageWidth') as HTMLInputElement).value) || 360;
}

function getMaxChunkHeight() {
  return parseInt((document.getElementById('maxChunkHeight') as HTMLInputElement).value) || 4096;
}

function getUseOriginalWidth(): boolean {
  const el = document.getElementById('useOriginalWidth') as HTMLInputElement | null;
  return !!el && el.checked;
}

async function processImage(file: File) {
  return new Promise<{ chunks: Array<{ originalWidth: number; originalHeight: number; displayWidth: number; displayHeight: number; data: string }>; displayWidth: number; displayHeight: number }>((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error(`Failed to load image: ${file.name}`)); };
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const useOriginal = getUseOriginalWidth();
      const originalWidth = img.width;
      const originalHeight = img.height;
      const displayWidth = useOriginal ? originalWidth : getImageWidth();
      const maxChunkSize = getMaxChunkHeight();
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
// DOM References
// ================================================================

const dropZone = document.getElementById('dropZone')!;
const folderInput = document.getElementById('folderInput')! as HTMLInputElement;
const fileInput = document.getElementById('fileInput')! as HTMLInputElement;
const fileSelectBtn = document.getElementById('fileSelectBtn')!;
const skippedNotice = document.getElementById('skippedNotice')!;

const analysisSection = document.getElementById('analysisSection')!;
const analysisProgressFill = document.getElementById('analysisProgressFill')!;
const analysisProgressText = document.getElementById('analysisProgressText')!;

const previewSection = document.getElementById('previewSection')!;
const folderPreviewWrap = document.getElementById('folderPreviewWrap')!;
const folderPreviewContent = document.getElementById('folderPreviewContent')!;
const smartPreviewWrap = document.getElementById('smartPreviewWrap')!;
const analysisInfo = document.getElementById('analysisInfo')!;
const smartPreviewEl = document.getElementById('smartPreview')!;
const statsEl = document.getElementById('stats')!;

const importBtn = document.getElementById('importBtn')!;
const cancelImportBtn = document.getElementById('cancelImportBtn')!;
const importProgress = document.getElementById('importProgress')!;
const importProgressFill = document.getElementById('importProgressFill')!;
const importProgressText = document.getElementById('importProgressText')!;

// ================================================================
// Drop Zone Events
// ================================================================

dropZone.addEventListener('click', (e) => { e.stopPropagation(); folderInput.value = ''; folderInput.click(); });
dropZone.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); folderInput.value = ''; folderInput.click(); } });

fileSelectBtn.addEventListener('click', () => { fileInput.value = ''; fileInput.click(); });

let dragCounter = 0;
dropZone.addEventListener('dragenter', (e) => {
  e.preventDefault();
  dragCounter++;
  dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
});
dropZone.addEventListener('dragleave', () => {
  dragCounter--;
  if (dragCounter <= 0) { dragCounter = 0; dropZone.classList.remove('drag-over'); }
});
dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dragCounter = 0;
  dropZone.classList.remove('drag-over');

  const items = e.dataTransfer?.items;
  if (items && items.length > 0) {
    const imageFiles: File[] = [];
    let hasDirectory = false;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      try {
        const entry = item.webkitGetAsEntry?.();
        if (entry && entry.isDirectory) { hasDirectory = true; continue; }
      } catch (_) { /* ignore */ }
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) imageFiles.push(file);
      }
    }
    if (hasDirectory && imageFiles.length === 0) {
      alert(t('folderDropNotSupported'));
      return;
    }
    if (imageFiles.length > 0) {
      handleDroppedFiles(imageFiles);
      return;
    }
  }

  const dtFiles = e.dataTransfer?.files;
  if (dtFiles && dtFiles.length > 0) {
    handleDroppedFiles(Array.from(dtFiles));
  }
});

folderInput.addEventListener('change', (e) => handleFolderSelected((e.target as HTMLInputElement).files!));
fileInput.addEventListener('change', (e) => handleDroppedFiles(Array.from((e.target as HTMLInputElement).files!)));
importBtn.addEventListener('click', startImport);

(() => {
  const cb = document.getElementById('useOriginalWidth') as HTMLInputElement | null;
  const widthInput = document.getElementById('imageWidth') as HTMLInputElement | null;
  if (!cb || !widthInput) return;
  const sync = () => { widthInput.disabled = cb.checked; widthInput.style.opacity = cb.checked ? '0.5' : '1'; };
  cb.addEventListener('change', sync);
  sync();
})();

// ================================================================
// Input Routing — Multi-folder accumulation with auto-detect
// ================================================================

let accumulatedFiles: File[] = [];

function fileKey(f: File): string {
  const rel = (f as File & { webkitRelativePath?: string }).webkitRelativePath;
  return rel || `${f.name}__${f.size}__${f.lastModified}`;
}

function filterImages(files: File[]): File[] {
  return files.filter(f => {
    const name = f.name.toLowerCase();
    return !name.startsWith('.') && (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg'));
  });
}

function hasSubfolders(files: File[]): boolean {
  for (const file of files) {
    const parts = (file as File & { webkitRelativePath?: string }).webkitRelativePath?.split('/');
    if (parts && parts.length >= 3) return true;
  }
  return false;
}

function handleFolderSelected(fileList: FileList) {
  const allFiles = Array.from(fileList);
  const imageFiles = filterImages(allFiles);
  if (imageFiles.length === 0) { alert(t('noImageInFolder')); return; }

  const skipped = allFiles.length - imageFiles.length;
  if (skipped > 0) {
    skippedNotice.innerHTML = `<div class="skipped-notice">${escapeHtml(t('skippedFiles', { count: skipped }))}</div>`;
  }

  const existingKeys = new Set(accumulatedFiles.map(fileKey));
  const uniqueNew = imageFiles.filter(f => !existingKeys.has(fileKey(f)));
  accumulatedFiles = accumulatedFiles.concat(uniqueNew);

  markDropZoneActive(accumulatedFiles.length);
  processAccumulatedFiles();
}

function handleDroppedFiles(files: File[]) {
  const imageFiles = filterImages(files);
  const skipped = files.length - imageFiles.length;
  if (skipped > 0) {
    skippedNotice.innerHTML = `<div class="skipped-notice">${escapeHtml(t('skippedFiles', { count: skipped }))}</div>`;
  }
  if (imageFiles.length === 0 && accumulatedFiles.length === 0) {
    alert(t('noImageFiles'));
    return;
  }

  const existingKeys = new Set(accumulatedFiles.map(fileKey));
  const uniqueNew = imageFiles.filter(f => !existingKeys.has(fileKey(f)));
  accumulatedFiles = accumulatedFiles.concat(uniqueNew);

  markDropZoneActive(accumulatedFiles.length);
  processAccumulatedFiles();
}

function processAccumulatedFiles() {
  if (accumulatedFiles.length === 0) return;

  if (hasSubfolders(accumulatedFiles)) {
    currentImportMode = 'folder';
    showSmartSettings(false);
    folderSelectedFiles = accumulatedFiles;
    folderStructure = buildFolderStructure(accumulatedFiles);
    if (Object.keys(folderStructure).length === 0) { alert(t('folderParseError')); return; }
    showFolderPreview();
  } else {
    currentImportMode = 'smart';
    showSmartSettings(true);
    smartRawFiles = [...accumulatedFiles].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));
    if (smartRawFiles.length > MAX_FILES_WARNING) {
      if (!confirm(t('largeFileWarning', { count: smartRawFiles.length }))) return;
    }
    analyzeScreenshots();
  }
}

function clearAllFiles() {
  accumulatedFiles = [];
  folderSelectedFiles = [];
  folderStructure = {};
  smartRawFiles = [];
  smartCompData = [];
  smartThumbnails = [];
  smartSections = [];
  skippedNotice.innerHTML = '';
  previewSection.style.display = 'none';
  analysisSection.style.display = 'none';
  importBtn.setAttribute('disabled', '');
  showSmartSettings(false);
  resetDropZone();
}

function markDropZoneActive(fileCount: number) {
  dropZone.classList.add('has-files');
  const textEl = dropZone.querySelector('.drop-zone-text');
  if (textEl) {
    textEl.innerHTML = `<strong>${escapeHtml(t('filesReady', { count: fileCount }))}</strong><br><span class="drop-zone-sub">${escapeHtml(t('addMoreFolders'))}</span>`;
  }
  const clearBtn = document.getElementById('clearAllBtn');
  if (clearBtn) clearBtn.style.display = '';
}

function resetDropZone() {
  dropZone.classList.remove('has-files');
  const textEl = dropZone.querySelector('.drop-zone-text');
  if (textEl) {
    textEl.innerHTML = `<strong data-i18n="clickSelectFolder">${escapeHtml(t('clickSelectFolder'))}</strong><br><span class="drop-zone-sub" data-i18n="dropHint">${escapeHtml(t('dropHint'))}</span>`;
  }
  const clearBtn = document.getElementById('clearAllBtn');
  if (clearBtn) clearBtn.style.display = 'none';
}

function startImport() {
  if (currentImportMode === 'folder') startFolderImport();
  else startSmartImport();
}

// ================================================================
// Folder Import Mode
// ================================================================

let folderSelectedFiles: File[] = [];
let folderStructure: Record<string, unknown> = {};
function buildFolderStructure(files: File[]) {
  const structure: Record<string, unknown> = {};
  files.forEach(file => {
    const rel = (file as File & { webkitRelativePath?: string }).webkitRelativePath;
    if (!rel) return;
    const pathParts = rel.split('/');
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

function showFolderPreview() {
  previewSection.style.display = 'block';
  folderPreviewWrap.style.display = 'block';
  smartPreviewWrap.style.display = 'none';
  renderFolderPreview();
  importBtn.removeAttribute('disabled');
}

function renderFolderPreview() {
  let html = '';
  let totalFiles = 0, totalSections = 0, totalFolders = 0;
  let sectionIdx = 0;

  function renderFolder(obj: Record<string, unknown>, indent = 0, isSection = false): string {
    let result = '';
    for (const [key, value] of Object.entries(obj)) {
      if (key === '_files') {
        (value as Array<{ name: string }>).forEach(f => { result += `<div class="preview-item preview-file" style="padding-left: ${indent + 12}px">\u{1F4C4} ${escapeHtml(f.name)}</div>`; totalFiles++; });
      } else {
        if (isSection) {
          const idx = sectionIdx++;
          result += `<div class="preview-item preview-section">\u{1F4C1} [Section] <input type="text" class="section-name-input" data-folder-section="${idx}" value="${escapeHtml(key)}" placeholder="${escapeHtml(t('sectionNamePlaceholder'))}" /></div>`;
          totalSections++;
        } else {
          result += `<div class="preview-item preview-folder" style="padding-left: ${indent}px">\u{1F4C2} [AutoLayout] ${escapeHtml(key)}</div>`;
          totalFolders++;
        }
        result += renderFolder(value as Record<string, unknown>, indent + 12, false);
      }
    }
    return result;
  }
  html = renderFolder(folderStructure, 0, true);
  folderPreviewContent.innerHTML = html;
  statsEl.innerHTML = t('folderStats', { sections: totalSections, folders: totalFolders, files: totalFiles });

  folderPreviewContent.querySelectorAll('.section-name-input').forEach(input => {
    (input as HTMLInputElement).addEventListener('change', () => {
      applyFolderSectionRenames();
    });
  });
}

function applyFolderSectionRenames() {
  const inputs = folderPreviewContent.querySelectorAll<HTMLInputElement>('.section-name-input[data-folder-section]');
  const oldKeys = Object.keys(folderStructure).filter(k => k !== '_files');
  const renames: Array<{ oldKey: string; newKey: string }> = [];
  inputs.forEach((input, i) => {
    const newName = input.value.trim();
    if (newName && i < oldKeys.length && oldKeys[i] !== newName) {
      renames.push({ oldKey: oldKeys[i], newKey: newName });
    }
  });
  for (const { oldKey, newKey } of renames) {
    if (folderStructure[oldKey]) {
      const data = folderStructure[oldKey];
      delete folderStructure[oldKey];
      folderStructure[newKey] = data;
    }
  }
}

async function startFolderImport() {
  applyFolderSectionRenames();
  importBtn.setAttribute('disabled', '');
  cancelImportBtn.style.display = 'block';
  importProgress.style.display = 'block';
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
          importProgressText.textContent = t('processingFile', { name: fileInfo.name });
          try {
            const result = await processImage(fileInfo.file);
            (target._files as Array<{ name: string; chunks: unknown; displayWidth: number; displayHeight: number }>).push({ name: fileInfo.name, chunks: result.chunks, displayWidth: result.displayWidth, displayHeight: result.displayHeight });
          } catch (e) { console.warn('Skipping failed image:', fileInfo.name, e); skippedFiles++; }
          processedFiles++;
          const pct = (processedFiles / totalFiles) * 100;
          importProgressFill.style.width = `${pct}%`;
          importProgress.setAttribute('aria-valuenow', String(Math.round(pct)));
        }
      } else { target[key] = {}; await processFolder(value as Record<string, unknown>, target[key] as Record<string, unknown>); }
    }
  }
  await processFolder(folderStructure, processedData.structure);
  cancelImportBtn.style.display = 'none';
  if (cancelFlags.folder) {
    importProgressText.textContent = t('importCancelled');
    importProgressFill.style.width = '0%';
    setTimeout(() => { importProgress.style.display = 'none'; importBtn.removeAttribute('disabled'); }, 1500);
    return;
  }
  importProgressText.textContent = t('sendingToFigma');
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
  previewSection.style.display = 'none';
  analysisSection.style.display = 'block';
  importBtn.setAttribute('disabled', '');
  (analysisSection.querySelector('.progress') as HTMLElement).style.display = 'block';
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
    analysisSection.querySelector('[role=progressbar]')?.setAttribute('aria-valuenow', String(Math.round(pct)));
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
    setTimeout(() => { analysisSection.style.display = 'none'; }, 2000);
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

  analysisProgressFill.style.width = '100%';
  analysisProgressText.textContent = t('analysisComplete');
  setTimeout(() => {
    analysisSection.style.display = 'none';
    showSmartPreview(loadErrors);
  }, 500);
}

function finishCancelledAnalysis() {
  (analysisSection.querySelector('.progress') as HTMLElement).style.display = 'none';
  analysisSection.style.display = 'none';
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

  for (const s of scores) {
    if (!usedNames.has(s.label)) return s.label;
  }

  const wordCounts = new Map<string, number>();
  const stopWords = new Set(['img', 'image', 'screenshot', 'screen', 'photo', 'pic', 'capture', 'shot', 'iphone', 'android', 'pixel', 'samsung', 'simulator', 'png', 'jpg', 'jpeg', 'at', 'am', 'pm']);
  for (const fn of filenames) {
    const words = fn.split(/[\s_\-./\\()[\]{}]+/).filter(w => w.length >= 3 && !/^\d+$/.test(w) && !stopWords.has(w));
    const seen = new Set<string>();
    for (const w of words) {
      if (!seen.has(w)) { wordCounts.set(w, (wordCounts.get(w) || 0) + 1); seen.add(w); }
    }
  }
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

function showSmartPreview(loadErrors: number) {
  previewSection.style.display = 'block';
  folderPreviewWrap.style.display = 'none';
  smartPreviewWrap.style.display = 'block';
  renderSmartPreview(loadErrors);
  importBtn.removeAttribute('disabled');
}

function renderSmartPreview(loadErrors: number) {
  let totalScreens = 0, scrollGroupCount = 0;
  let html = '';
  smartSections.forEach((section, sIdx) => {
    let sectionScreenCount = 0;
    section.groups.forEach(g => { sectionScreenCount += g.screens.length; if (g.isScrollGroup) scrollGroupCount++; });
    totalScreens += sectionScreenCount;
    const screenWord = sectionScreenCount > 1 ? t('screens') : t('screen');
    const displayName = section.name || section.suggestedName;
    html += `<div class="smart-section">`;
    html += `<div class="smart-section-header">`;
    html += `<span class="section-badge">Section</span>`;
    html += `<div class="section-name-wrapper">`;
    html += `<input type="text" class="section-name-input" value="${escapeHtml(displayName)}" placeholder="${escapeHtml(t('sectionNamePlaceholder'))}" data-section-idx="${sIdx}" onchange="updateSectionName(${sIdx}, this.value)" aria-label="Section name">`;
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
  smartPreviewEl.innerHTML = html;
  let infoHtml = t('detectedSummary', { sections: smartSections.length, scrollGroups: scrollGroupCount, total: smartRawFiles.length });
  if (loadErrors > 0) infoHtml += t('loadErrorsSuffix', { count: loadErrors });
  analysisInfo.innerHTML = infoHtml;
  statsEl.innerHTML = t('statsSummary', { sections: smartSections.length, scrollGroups: scrollGroupCount, screens: totalScreens });
}

function updateSectionName(idx: number, name: string) {
  if (idx >= 0 && idx < smartSections.length) smartSections[idx].name = name;
}

async function startSmartImport() {
  importBtn.setAttribute('disabled', '');
  cancelImportBtn.style.display = 'block';
  importProgress.style.display = 'block';
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
        importProgressText.textContent = t('processingFile', { name: smartRawFiles[screenIdx].name });
        try {
          const result = await processImage(smartRawFiles[screenIdx]);
          processedScreens.push({ name: smartRawFiles[screenIdx].name, chunks: result.chunks, displayWidth: result.displayWidth, displayHeight: result.displayHeight });
        } catch (e) { console.warn('Skipping failed image:', smartRawFiles[screenIdx].name, e); skippedFiles++; }
        processedCount++;
        const pct = (processedCount / totalScreens) * 100;
        importProgressFill.style.width = `${pct}%`;
        importProgress.setAttribute('aria-valuenow', String(Math.round(pct)));
      }
      processedGroups.push({ screens: processedScreens, isScrollGroup: group.isScrollGroup });
    }
    const sectionName = section.name || section.suggestedName || `Section ${smartSections.indexOf(section) + 1}`;
    processedSections.push({ name: sectionName, groups: processedGroups });
  }
  cancelImportBtn.style.display = 'none';
  if (cancelFlags.smart) {
    importProgressText.textContent = t('importCancelled');
    importProgressFill.style.width = '0%';
    setTimeout(() => { importProgress.style.display = 'none'; importBtn.removeAttribute('disabled'); }, 1500);
    return;
  }
  importProgressText.textContent = t('sendingToFigma');
  parent.postMessage({
    pluginMessage: {
      type: 'smart-import',
      data: { sections: processedSections, settings: { imageWidth: getImageWidth(), sectionGap: 100, groupGap: 8, scrollGap: 0 } },
      skippedFiles
    }
  }, '*');
}

// ================================================================
// Message Handling from Figma
// ================================================================

window.onmessage = (event: MessageEvent) => {
  const msg = event.data.pluginMessage;
  if (!msg) return;
  if (msg.type === 'progress') {
    importProgressText.textContent = msg.text;
    if (msg.percent !== undefined) importProgressFill.style.width = `${msg.percent}%`;
  } else if (msg.type === 'complete') {
    importProgressText.textContent = t('importComplete');
    importProgressFill.style.width = '100%';
    setTimeout(() => { importProgress.style.display = 'none'; importBtn.removeAttribute('disabled'); }, 2000);
  } else if (msg.type === 'error') {
    importProgressText.textContent = `Error: ${msg.text}`;
    importBtn.removeAttribute('disabled');
  }
};

// ================================================================
// Expose global functions for inline HTML handlers
// ================================================================
function cancelCurrentImport() { cancelImport(currentImportMode); }

(window as any).cancelImport = cancelImport;
(window as any).cancelCurrentImport = cancelCurrentImport;
(window as any).reAnalyze = reAnalyze;
(window as any).setLang = setLang;
(window as any).updateSectionName = updateSectionName;
(window as any).clearAllFiles = clearAllFiles;
