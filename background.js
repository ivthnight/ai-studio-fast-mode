chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: nukeInContext
  });
});

function nukeInContext() {
  console.log("DOM Ripper: Triggered from Toolbar!");
  
  const turns = document.querySelectorAll('ms-chat-turn');
  
  if (turns.length === 0) {
    alert("DOM Ripper: No chats found to nuke.");
    return;
  }

  // Keep the last 10 turns (User + Model) visible
  const keepCount = 10;
  let hiddenCount = 0;

  for (let i = 0; i < turns.length - keepCount; i++) {
    turns[i].style.display = 'none';
    hiddenCount++;
  }

  // Force garbage collection if the browser allows it
  if (window.gc) window.gc();

  // Show a quick visual confirmation
  const toast = document.createElement('div');
  toast.textContent = `☢️ Nuked ${hiddenCount} old messages`;
  toast.style.cssText = `
      position: fixed; bottom: 80px; right: 20px;
      background: #333; color: #fff; padding: 10px 20px;
      border-radius: 8px; z-index: 10000; font-family: monospace;
      transition: opacity 0.5s;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
  }, 2000);
}