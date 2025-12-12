# AI Studio DOM Ripper
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A simple, privacy-focused browser extension designed to eliminate lag in Google AI Studio by essentially "nuking" older chat renders from the DOM, while keeping the ability to restore them instantly.

## 🚀 Why is this needed?

Long conversations in AI Studio can cause significant browser lag. This happens because the browser has to render and manage memory for every single message in the chat history, even the ones you aren't looking at.

**AI Studio DOM Ripper** solves this by:
1.  **Nuking (Hiding) Old Chats**: It finds all older chat messages (keeps the last 16 turns active) and sets them to `display: none`. This removes them from the browser's simplified render tree, freeing up resources and making scrolling/typing snappy again.
2.  **Toggle Restore**: It remembers what it hid. Just click the extension icon again to instantly bring back all your chat history if you need to reference earlier context.

## 🛡️ Privacy & Safety
- **Open Source**: The code is all right here. You can see exactly what it does.
- **No External Servers**: It runs 100% locally in your browser. No data is sent anywhere.
- **No Sketchy Stores**: You install this manually (unpacked), so you don't run the risk of a store extension being sold to a bad actor later.
- **Manual Activation Only**: The code only runs when you click the button. It does not run in the background, does not track you, and does not watch your browsing. Zero surveillance.

## ⚙️ How it works (The Technical Stuff)
The extension uses a simple toggle logic in `background.js`:
- **Cleanup Mode**: Scans for `<ms-chat-turn>` elements. It keeps the last **16 turns** visible and hides the rest. It also triggers a garbage collection hint (`window.gc()`) if available.
- **Restore Mode**: If it detects hidden messages, it un-hides them immediately.

## 📥 Installation

You do not need to pack this or download it from the Chrome Web Store. You can install it directly from the source code.

### Chrome & Edge (Chromium Browsers)

1.  **Download/Clone** this repository to a folder on your computer.
2.  Open your browser's extension management page:
    -   **Chrome**: Type `chrome://extensions` in the address bar.
    -   **Edge**: Type `edge://extensions` in the address bar.
3.  **Enable Developer Mode**:
    -   Look for a toggle switch named "Developer mode" (usually in the top right corner) and turn it **ON**.
4.  **Load Unpacked**:
    -   Click the button that says **"Load unpacked"**.
5.  **Select Folder**:
    -   Browse to and select the folder where you saved this project (the folder containing `manifest.json`).
    
**That's it!** You should now see the "AI Studio DOM Ripper" icon in your toolbar.

## 🎮 How to use
1.  Open a long chat in Google AI Studio.
2.  If it starts lagging, **click the extension icon**.
    -   You'll see a toast message: `☢️ Nuked X messages. Fast mode ON.`
3.  To see old messages again, **click the icon again**.
    -   You'll see a toast message: `♻️ Restored X messages to view.`

## ⚠️ Disclaimer
This tool is an independent open-source project and is **not** affiliated with, endorsed by, or connected to Google or Google AI Studio in any way.
