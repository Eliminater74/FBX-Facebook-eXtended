function injectFloatingButton() {
  if (document.getElementById('fbx-launcher')) return;

  const fbxButton = document.createElement('div');
  fbxButton.id = 'fbx-launcher';
  fbxButton.textContent = '⚙ FBX Panel';
  fbxButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #4267B2;
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-family: sans-serif;
    z-index: 999999;
    box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    cursor: pointer;
    user-select: none;
  `;

  fbxButton.addEventListener('click', () => {
    alert('🧠 FBX Panel Clicked! (UI coming soon)');
  });

  document.body.appendChild(fbxButton);
  console.log('✅ FBX button injected');
}
