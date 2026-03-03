"use strict";
/**
 * Bulk Screenshot Importer Plugin
 *
 * Imports screenshots from local folder to Figma with:
 * - Automatic image splitting for high resolution
 * - Section/AutoLayout/Group hierarchy matching folder structure
 * - Configurable image width and chunk height
 */
// ============================================================================
// Configuration
// ============================================================================
const CONFIG = {
    autoLayoutGap: 24, // Gap between images in AutoLayout
    sectionGap: 100, // Gap between sections
    groupGap: 0, // Gap between image chunks in a group (vertical stack)
    defaultImageWidth: 360,
    defaultMaxChunkHeight: 4096
};
// ============================================================================
// Helper Functions
// ============================================================================
/**
 * Base64 character lookup table
 */
const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
/**
 * Custom base64 decoder (atob is not available in Figma sandbox)
 */
function decodeBase64(base64) {
    // Remove padding
    const cleanBase64 = base64.replace(/=/g, '');
    const len = cleanBase64.length;
    const bufferLength = Math.floor(len * 3 / 4);
    const bytes = new Uint8Array(bufferLength);
    let p = 0;
    for (let i = 0; i < len; i += 4) {
        const a = BASE64_CHARS.indexOf(cleanBase64[i]);
        const b = BASE64_CHARS.indexOf(cleanBase64[i + 1]);
        const c = i + 2 < len ? BASE64_CHARS.indexOf(cleanBase64[i + 2]) : 0;
        const d = i + 3 < len ? BASE64_CHARS.indexOf(cleanBase64[i + 3]) : 0;
        bytes[p++] = (a << 2) | (b >> 4);
        if (i + 2 < len && cleanBase64[i + 2] !== '=') {
            bytes[p++] = ((b & 15) << 4) | (c >> 2);
        }
        if (i + 3 < len && cleanBase64[i + 3] !== '=') {
            bytes[p++] = ((c & 3) << 6) | d;
        }
    }
    return bytes.slice(0, p);
}
/**
 * Convert base64 data URL to Uint8Array
 */
function base64ToUint8Array(dataUrl) {
    const base64 = dataUrl.split(',')[1];
    return decodeBase64(base64);
}
/**
 * Send progress message to UI
 */
function sendProgress(text, percent) {
    figma.ui.postMessage({
        type: 'progress',
        text: text,
        percent: percent
    });
}
/**
 * Send completion message to UI
 */
function sendComplete() {
    figma.ui.postMessage({ type: 'complete' });
}
/**
 * Send error message to UI
 */
function sendError(text) {
    figma.ui.postMessage({
        type: 'error',
        text: text
    });
}
// ============================================================================
// Figma Layer Creation
// ============================================================================
/**
 * Create an image node from chunk data
 * Uses high-res image data but displays at smaller size
 */
async function createImageNode(chunk) {
    const imageBytes = base64ToUint8Array(chunk.data);
    const image = figma.createImage(imageBytes);
    const rect = figma.createRectangle();
    rect.resize(chunk.displayWidth, chunk.displayHeight);
    rect.fills = [{
            type: 'IMAGE',
            imageHash: image.hash,
            scaleMode: 'FILL'
        }];
    return rect;
}
let importErrorCount = 0;
/**
 * Create a group containing all image chunks (vertical stack)
 */
async function createImageGroup(file) {
    const frame = figma.createFrame();
    frame.name = file.name;
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'AUTO';
    frame.itemSpacing = CONFIG.groupGap;
    frame.fills = [];
    let hasContent = false;
    for (let i = 0; i < file.chunks.length; i++) {
        try {
            const imageNode = await createImageNode(file.chunks[i]);
            imageNode.name = `chunk-${i + 1}`;
            frame.appendChild(imageNode);
            hasContent = true;
        }
        catch (e) {
            console.error(`Failed to create image chunk for ${file.name}:`, e);
            importErrorCount++;
        }
    }
    if (!hasContent) {
        frame.remove();
        return null;
    }
    return frame;
}
/**
 * Create an AutoLayout frame for a subfolder
 */
async function createAutoLayoutFrame(name, folderData) {
    const frame = figma.createFrame();
    frame.name = name;
    frame.layoutMode = 'HORIZONTAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'AUTO';
    frame.itemSpacing = CONFIG.autoLayoutGap;
    frame.paddingLeft = 0;
    frame.paddingRight = 0;
    frame.paddingTop = 0;
    frame.paddingBottom = 0;
    frame.fills = []; // Transparent background
    if (folderData._files) {
        for (const file of folderData._files) {
            const imageGroup = await createImageGroup(file);
            if (imageGroup)
                frame.appendChild(imageGroup);
        }
    }
    for (const [key, value] of Object.entries(folderData)) {
        if (key === '_files')
            continue;
        const nestedFrame = await createAutoLayoutFrame(key, value);
        frame.appendChild(nestedFrame);
    }
    return frame;
}
/**
 * Create a Section for a top-level folder
 */
async function createSection(name, sectionData, x, y) {
    const section = figma.createSection();
    section.name = name;
    section.x = x;
    section.y = y;
    let currentX = 24; // Padding inside section
    let currentY = 24;
    let maxHeight = 0;
    // Process each subfolder as an AutoLayout
    for (const [key, value] of Object.entries(sectionData)) {
        if (key === '_files')
            continue;
        const autoLayout = await createAutoLayoutFrame(key, value);
        autoLayout.x = currentX;
        autoLayout.y = currentY;
        section.appendChild(autoLayout);
        currentX += autoLayout.width + CONFIG.autoLayoutGap;
        maxHeight = Math.max(maxHeight, autoLayout.height);
    }
    // Handle files directly in section (if any)
    if (sectionData._files) {
        const directFrame = figma.createFrame();
        directFrame.name = 'root';
        directFrame.layoutMode = 'HORIZONTAL';
        directFrame.primaryAxisSizingMode = 'AUTO';
        directFrame.counterAxisSizingMode = 'AUTO';
        directFrame.itemSpacing = CONFIG.autoLayoutGap;
        directFrame.fills = [];
        for (const file of sectionData._files) {
            const imageGroup = await createImageGroup(file);
            if (imageGroup)
                directFrame.appendChild(imageGroup);
        }
        directFrame.x = currentX;
        directFrame.y = currentY;
        section.appendChild(directFrame);
        currentX += directFrame.width + CONFIG.autoLayoutGap;
        maxHeight = Math.max(maxHeight, directFrame.height);
    }
    // Resize section to fit contents
    section.resizeWithoutConstraints(currentX + 24, // Right padding
    maxHeight + 48 // Top + bottom padding
    );
    return section;
}
// ============================================================================
// Smart Import: Figma Layer Creation
// ============================================================================
/**
 * Create a Section for a smart-imported app section.
 * Contains a horizontal AutoLayout of screen groups.
 */
async function createSmartSection(sectionData, settings, x, y) {
    const section = figma.createSection();
    section.name = sectionData.name;
    section.x = x;
    section.y = y;
    const rowFrame = figma.createFrame();
    rowFrame.name = 'screens';
    rowFrame.layoutMode = 'HORIZONTAL';
    rowFrame.primaryAxisSizingMode = 'AUTO';
    rowFrame.counterAxisSizingMode = 'AUTO';
    rowFrame.counterAxisAlignItems = 'MIN';
    rowFrame.itemSpacing = settings.groupGap;
    rowFrame.fills = [];
    for (const group of sectionData.groups) {
        if (group.isScrollGroup && group.screens.length > 1) {
            const scrollFrame = figma.createFrame();
            scrollFrame.name = 'scroll-group';
            scrollFrame.layoutMode = 'VERTICAL';
            scrollFrame.primaryAxisSizingMode = 'AUTO';
            scrollFrame.counterAxisSizingMode = 'AUTO';
            scrollFrame.itemSpacing = settings.scrollGap;
            scrollFrame.fills = [];
            for (const screen of group.screens) {
                const imageFrame = await createImageGroup(screen);
                if (imageFrame)
                    scrollFrame.appendChild(imageFrame);
            }
            rowFrame.appendChild(scrollFrame);
        }
        else {
            for (const screen of group.screens) {
                const imageFrame = await createImageGroup(screen);
                if (imageFrame)
                    rowFrame.appendChild(imageFrame);
            }
        }
    }
    rowFrame.x = 24;
    rowFrame.y = 24;
    section.appendChild(rowFrame);
    section.resizeWithoutConstraints(rowFrame.width + 48, rowFrame.height + 48);
    return section;
}
/**
 * Main entry point for smart import
 */
async function importSmartScreenshots(data) {
    importErrorCount = 0;
    const { sections, settings } = data;
    if (sections.length === 0) {
        sendError('No sections found in data');
        return;
    }
    const viewport = figma.viewport.center;
    let currentX = viewport.x - 500;
    let currentY = viewport.y - 500;
    const createdSections = [];
    for (let i = 0; i < sections.length; i++) {
        sendProgress(`Creating section: ${sections[i].name}`, ((i + 1) / sections.length) * 100);
        const section = await createSmartSection(sections[i], settings, currentX, currentY);
        createdSections.push(section);
        currentY += section.height + settings.sectionGap;
    }
    figma.currentPage.selection = createdSections;
    figma.viewport.scrollAndZoomIntoView(createdSections);
    sendComplete();
    const errMsg = importErrorCount > 0 ? ` (${importErrorCount} image errors skipped)` : '';
    figma.notify(`Smart Import: ${sections.length} sections created!${errMsg}`, { timeout: 3000 });
}
// ============================================================================
// Main Import Logic (Folder Mode)
// ============================================================================
async function importScreenshots(data) {
    importErrorCount = 0;
    const { structure, settings } = data;
    const sectionNames = Object.keys(structure);
    const totalSections = sectionNames.length;
    if (totalSections === 0) {
        sendError('No sections found in data');
        return;
    }
    // Get current viewport center for placement
    const viewport = figma.viewport.center;
    let currentX = viewport.x - 500;
    let currentY = viewport.y - 500;
    // Create sections
    const createdSections = [];
    for (let i = 0; i < sectionNames.length; i++) {
        const sectionName = sectionNames[i];
        const sectionData = structure[sectionName];
        sendProgress(`Creating section: ${sectionName}`, ((i + 1) / totalSections) * 100);
        const section = await createSection(sectionName, sectionData, currentX, currentY);
        createdSections.push(section);
        // Move Y position for next section
        currentY += section.height + CONFIG.sectionGap;
    }
    // Select all created sections
    figma.currentPage.selection = createdSections;
    // Zoom to fit
    figma.viewport.scrollAndZoomIntoView(createdSections);
    sendComplete();
    const errMsg = importErrorCount > 0 ? ` (${importErrorCount} image errors skipped)` : '';
    figma.notify(`Imported ${totalSections} sections successfully!${errMsg}`, { timeout: 3000 });
}
// ============================================================================
// Plugin Entry Point
// ============================================================================
// Show UI
figma.showUI(__html__, {
    width: 420,
    height: 700,
    title: 'Bulk Screenshot Importer'
});
// Handle messages from UI
figma.ui.onmessage = async (msg) => {
    try {
        if (msg.type === 'import') {
            await importScreenshots(msg.data);
        }
        else if (msg.type === 'smart-import') {
            await importSmartScreenshots(msg.data);
        }
    }
    catch (error) {
        console.error('Import error:', error);
        sendError(error instanceof Error ? error.message : 'Unknown error');
    }
};
