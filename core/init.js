// FBX: Core Init Script (Plain JS)

// Basic DOM observer
function observeDOM() {
  const target = document.body;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      hideSponsored(); // Re-scan when DOM changes
    });
  });

  observer.observe(target, {
    childList: true,
    subtree: true
  });

  console.log('👁️ MutationObserver active');
}

// Hides Facebook sponsored content
function hideSponsored() {
  const spans = document.querySelectorAll('span');

  spans.forEach(span => {
    if (span.innerText.includes("Sponsored")) {
      const post = span.closest('[role="article"]');
      if (post) {
        post.style.display = 'none';
        console.log('🚫 Sponsored post hidden');
      }
    }
  });
}

// Init everything after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c✅ FBX Loaded!', 'color: limegreen; font-weight: bold;');

  observeDOM();
  hideSponsored();
});
