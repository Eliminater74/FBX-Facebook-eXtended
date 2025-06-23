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

function initFBX() {
  console.log('%c✅ FBX Loaded!', 'color: limegreen; font-weight: bold;');
  observeDOM();
  hideSponsored();
  if (typeof injectFloatingButton === 'function') {
    injectFloatingButton();
  } else {
    console.error('⚠️ injectFloatingButton not defined!');
  }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initFBX();
} else {
  document.addEventListener('DOMContentLoaded', initFBX);
}
