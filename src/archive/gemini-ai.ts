/**
 * Gemini AI — Section & Screen Name Suggestion
 * 
 * Archived from v3.1.0 (2026-03-19)
 * 
 * This module provided AI-powered naming for Figma layers using Google's
 * Gemini 2.0 Flash API. It was removed from the active plugin to simplify
 * the UX and avoid reliability issues (rate limiting, API key management).
 * 
 * HOW IT WORKED:
 * - User entered a Gemini API key (BYOK pattern, free tier)
 * - During smart analysis, representative screenshots (1 per section) were
 *   sent to Gemini as 200px thumbnails
 * - Gemini identified the app's navigation structure and returned section names
 * - Individual screen names were derived from section names + position
 * 
 * TO RESTORE:
 * 1. Add networkAccess to manifest.json:
 *    "networkAccess": { "allowedDomains": ["https://generativelanguage.googleapis.com"] }
 * 2. Add the API key UI to index.html (see ai-settings section below)
 * 3. Integrate the functions below into main.ts
 * 4. Call suggestSectionNamesWithAI() after section detection in analyzeScreenshots()
 * 
 * KNOWN ISSUES:
 * - Free tier rate limits (429) with repeated usage
 * - API key input timing (onchange vs onclick race condition)
 * - 48px thumbnails were too small; 200px worked better
 * - Need visible error feedback (not just console.warn)
 * 
 * LESSONS LEARNED (see lessons.md for full context):
 * - BYOK pattern works well for optional AI features
 * - Sending fewer images (1 per section vs all) dramatically reduces token usage
 * - AI suggestions should auto-apply as default values, not placeholders
 * - Error states must be visible in the UI, not buried in console
 */

// ================================================================
// API Key Management
// ================================================================

function getGeminiApiKey(): string {
  const input = document.getElementById('geminiApiKey') as HTMLInputElement | null;
  const inputVal = input?.value?.trim() || '';
  if (inputVal) {
    try { localStorage.setItem('bsi-gemini-key', inputVal); } catch {}
    return inputVal;
  }
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

// ================================================================
// AI Section Naming (sends 1 representative image per section)
// ================================================================

const AI_THUMB_WIDTH = 200;

async function suggestSectionNamesWithAI(
  sections: Array<{ groups: Array<{ screens: number[] }> }>,
  aiThumbnails: string[],
  onStatus: (msg: string) => void
): Promise<string[]> {
  const apiKey = getGeminiApiKey();
  if (!apiKey) { onStatus('No API key'); return []; }

  const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];
  parts.push({
    text: [
      'You are a mobile app UX analyst. These are representative screenshots from different sections of a single mobile app.',
      '',
      'TASK:',
      '1. Identify the app and its main navigation structure (e.g. bottom tab bar: Home, Explore, Profile, etc.).',
      '2. For each image, output ONE short label (1-4 words) that names the navigation section or screen type.',
      '',
      'Examples: "Home", "Explore", "Sleep", "Profile", "Settings", "Onboarding", "App Store", "Login", "Meditation Player".',
      '',
      'Reply with ONLY the labels, one per line, in the exact same order as the images.',
      'No numbering, no explanation, no markdown.',
    ].join('\n')
  });

  let imageCount = 0;
  for (let i = 0; i < sections.length; i++) {
    const repIdx = sections[i].groups[0]?.screens[0];
    if (repIdx == null || !aiThumbnails[repIdx]) continue;
    const dataUrl = aiThumbnails[repIdx];
    const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const mimeMatch = dataUrl.match(/^data:(image\/\w+);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    parts.push({ text: `Section ${imageCount + 1}:` });
    parts.push({ inlineData: { mimeType, data: base64 } });
    imageCount++;
  }

  if (imageCount === 0) { onStatus('No valid thumbnails'); return []; }
  onStatus(`Sending ${imageCount} section images to AI...`);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const body = JSON.stringify({ contents: [{ parts }] });

  let resp: Response | null = null;
  const maxRetries = 3;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    if (resp.status !== 429 || attempt === maxRetries) break;
    const waitSec = (attempt + 1) * 15;
    onStatus(`Rate limited — retrying in ${waitSec}s (${attempt + 1}/${maxRetries})...`);
    await new Promise(r => setTimeout(r, waitSec * 1000));
  }

  if (!resp || !resp.ok) {
    const errText = resp ? await resp.text().catch(() => '') : 'No response';
    const errMsg = `Gemini API error ${resp?.status || '?'}: ${errText.slice(0, 200)}`;
    onStatus(errMsg);
    throw new Error(errMsg);
  }

  const data = await resp.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  if (!text) { onStatus('AI returned empty response'); return []; }

  const labels = text.split('\n')
    .map((l: string) => l.replace(/^\d+[\.\)\-:\s]+/, '').replace(/^\*+\s*/, '').trim())
    .filter((l: string) => l.length > 0 && l.length < 80);

  onStatus(`AI returned ${labels.length} section names`);
  return labels;
}

// ================================================================
// Integration point in analyzeScreenshots() — after section detection:
// ================================================================
/*
  if (getGeminiApiKey()) {
    const sectionNames = await suggestSectionNamesWithAI(smartSections, smartAiThumbnails, onStatus);
    for (let i = 0; i < Math.min(sectionNames.length, smartSections.length); i++) {
      if (sectionNames[i]) {
        smartSections[i].suggestedName = sectionNames[i];
        // Derive screen labels from section name + position
        let screenNum = 1;
        for (const group of smartSections[i].groups) {
          for (const screenIdx of group.screens) {
            if (group.isScrollGroup && group.screens.length > 1) {
              const pos = group.screens.indexOf(screenIdx);
              const suffix = pos === 0 ? '(top)' : pos === group.screens.length - 1 ? '(bottom)' : `(scroll ${pos})`;
              smartScreenLabels[screenIdx] = `${sectionNames[i]} ${suffix}`;
            } else {
              smartScreenLabels[screenIdx] = `${sectionNames[i]} - ${screenNum}`;
            }
            screenNum++;
          }
        }
      }
    }
  }
*/

// ================================================================
// HTML for API Key Input (add inside settings-accordion > settings-body):
// ================================================================
/*
  <div class="settings ai-settings" id="aiSettings">
    <div class="setting-item" style="grid-column: 1 / -1;">
      <label for="geminiApiKey">Gemini API Key <span class="optional-badge">(optional)</span></label>
      <div class="api-key-wrapper">
        <input type="password" id="geminiApiKey" placeholder="AIza..."
               onchange="saveGeminiApiKey(this.value)" autocomplete="off">
        <button class="api-key-toggle" type="button" onclick="toggleApiKeyVisibility()">👁</button>
      </div>
      <span class="setting-hint">AI names screens from image content. Without a key, filenames are used.</span>
      <a href="https://aistudio.google.com/apikey" target="_blank" class="setting-link">Get free API key →</a>
    </div>
  </div>
*/

// ================================================================
// i18n keys (add to TEXTS object):
// ================================================================
/*
  geminiApiKeyLabel: 'Gemini API Key',
  optionalBadge: '(optional)',
  geminiApiKeyHint: 'Free — AI names each screen and section from image content.',
  getApiKey: 'Get free API key →',
  aiSuggesting: 'AI analyzing screenshots...',
  aiSuggestDone: 'AI labeled {count} screens',
  aiSuggestError: 'AI labeling failed — using filename hints',
*/
