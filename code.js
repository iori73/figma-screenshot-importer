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
    // Set display size (smaller than original for UI)
    rect.resize(chunk.displayWidth, chunk.displayHeight);
    // Fill with high-resolution image
    rect.fills = [{
            type: 'IMAGE',
            imageHash: image.hash,
            scaleMode: 'FILL' // Image will be scaled to fit, maintaining high-res data
        }];
    return rect;
}
/**
 * Create a group containing all image chunks (vertical stack)
 */
async function createImageGroup(file) {
    // Create a frame to act as the group
    const frame = figma.createFrame();
    frame.name = file.name;
    frame.layoutMode = 'VERTICAL';
    frame.primaryAxisSizingMode = 'AUTO';
    frame.counterAxisSizingMode = 'AUTO';
    frame.itemSpacing = CONFIG.groupGap;
    frame.fills = []; // Transparent background
    // Add each chunk as an image
    for (const chunk of file.chunks) {
        const imageNode = await createImageNode(chunk);
        imageNode.name = `chunk-${file.chunks.indexOf(chunk) + 1}`;
        frame.appendChild(imageNode);
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
    // Process files in this folder
    if (folderData._files) {
        for (const file of folderData._files) {
            const imageGroup = await createImageGroup(file);
            frame.appendChild(imageGroup);
        }
    }
    // Process nested subfolders
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
// Main Import Logic
// ============================================================================
async function importScreenshots(data) {
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
    figma.notify(`Imported ${totalSections} sections successfully!`, { timeout: 3000 });
}
// ============================================================================
// Plugin Entry Point
// ============================================================================
// Show UI
figma.showUI(__html__, {
    width: 400,
    height: 600,
    title: 'Bulk Screenshot Importer'
});
// Handle messages from UI
figma.ui.onmessage = async (msg) => {
    if (msg.type === 'import') {
        try {
            await importScreenshots(msg.data);
        }
        catch (error) {
            console.error('Import error:', error);
            sendError(error instanceof Error ? error.message : 'Unknown error');
        }
    }
};
