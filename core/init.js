function observeDOM() {
  const target = document.body;
  const observer = new MutationObserver(() => {
    if (settings.hideSponsored) hideSponsored();
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

function applyCustomCSS(css) {
  const style = document.createElement('style');
  style.id = 'fbx-custom-css';
  style.textContent = css;
  document.head.appendChild(style);
}

function applyDarkTheme() {
  document.body.style.background = '#18191a';
  document.body.style.color = '#e4e6eb';
}

const settings = JSON.parse(localStorage.getItem('fbx-settings')) || {
  hideSponsored: true,
  enableDarkTheme: false,
  customCSS: ''
};

function initFBX() {
  console.log('%c✅ FBX Loaded!', 'color: limegreen; font-weight: bold;');
  if (settings.hideSponsored) hideSponsored();
  observeDOM();

  if (settings.enableDarkTheme) applyDarkTheme();
  if (settings.customCSS) applyCustomCSS(settings.customCSS);

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
