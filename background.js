chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleDomRipper
  });
});

function toggleDomRipper() {
  // Select all turns
  const allTurns = Array.from(document.querySelectorAll('ms-chat-turn'));
  
  if (allTurns.length === 0) {
    showToast("⚠️ No chat found to manage.");
    return;
  }

  // Check how many are currently hidden
  const hiddenTurns = allTurns.filter(t => t.style.display === 'none');

  // LOGIC: RESTORE vs NUKE Chats
  if (hiddenTurns.length > 0) {
    // SCENARIO A: STUFF IS HIDDEN -> RESTORE IT
    hiddenTurns.forEach(t => t.style.display = '');
    showToast(`♻️ Restored ${hiddenTurns.length} messages to view.`);
    
  } else {
    // SCENARIO B: NOTHING HIDDEN -> NUKE IT
    const keepCount = 16;
    let nukeCount = 0;

    // Loop through everything except the last 16
    for (let i = 0; i < allTurns.length - keepCount; i++) {
      allTurns[i].style.display = 'none';
      nukeCount++;
    }

    // Hint browser to clean up layout memory
    if (window.gc) window.gc();

    if (nukeCount > 0) {
      showToast(`☢️ Nuked ${nukeCount} messages. Fast mode ON.`);
    } else {
      showToast("⚠️ Chat too short to nuke.");
    }
  }

  function showToast(message) {
    const existing = document.getElementById('dom-ripper-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'dom-ripper-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed; 
        bottom: 80px; 
        right: 20px;
        background: #222;
        color: #fff;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 999999;
        font-family: system-ui, sans-serif;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        pointer-events: none;
    `;
    
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => toast.style.opacity = '1');
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
}