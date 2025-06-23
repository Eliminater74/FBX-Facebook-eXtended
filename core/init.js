// == FBX: Core Init Script ==

function observeDOM() {
  const target = document.body;
  const observer = new MutationObserver(() => {
    hideSponsored();
  });
  observer.observe(target, { childList: true, subtree: true });
  console.log('🔍 MutationObserver active.');
}

function hideSponsored() {
  const spans = document.querySelectorAll('span');

  spans.forEach(span => {
    if (span.innerText.includes('Sponsored')) {
      const post = span.closest('[role="article"]');
      if (post) {
        post.style.display = 'none';
        console.log('❌ Sponsored post removed.');
      }
    }
  });
}

function createFBXButton() {
  if (document.getElementById('fbx-launcher')) return;

  const fbxButton = document.createElement('div');
  fbxButton.id = 'fbx-launcher';
  fbxButton.textContent = '⚙ FBX Panel';
  fbxButton.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #1e1e1e;
    color: limegreen;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-family: sans-serif;
    z-index: 999999999;
    box-shadow: 0 0 10px limegreen;
    cursor: pointer;
    user-select: none;
  `;

  fbxButton.addEventListener('click', () => {
    alert('🧠 FBX Panel Clicked! (UI coming soon)');
  });

  document.body.appendChild(fbxButton);
  console.log('✅ FBX button injected');
}

// === INIT EVERYTHING ON PAGE LOAD ===
function initFBX() {
  console.log('%c✅ FBX Loaded!', 'color: limegreen; font-weight: bold;');

  observeDOM();
  hideSponsored();
  createFBXButton();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initFBX();
} else {
  document.addEventListener('DOMContentLoaded', initFBX);
}
