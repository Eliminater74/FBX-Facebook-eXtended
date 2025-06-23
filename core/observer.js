// FBX: Simple DOM Observer (watch for feed changes)

function observeDOM() {
  const target = document.body;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      hideSponsored(); // React to DOM updates
    });
  });

  observer.observe(target, {
    childList: true,
    subtree: true
  });

  console.log('👁️ FBX MutationObserver active.');
}
