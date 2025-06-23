function injectFloatingButton() {
  if (document.getElementById('fbx-launcher')) return;

  const savedPosition = JSON.parse(localStorage.getItem('fbx-button-position')) || {
    bottom: '20px',
    right: '20px'
  };

  const savedSettings = JSON.parse(localStorage.getItem('fbx-settings')) || {
    hideSponsored: true,
    enableDarkTheme: false,
    customCSS: ''
  };

  const fbxButton = document.createElement('div');
  fbxButton.id = 'fbx-launcher';
  fbxButton.textContent = '⚙ FBX Panel';
  fbxButton.style.cssText = `
    position: fixed;
    background: #000;
    color: limegreen;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-family: sans-serif;
    z-index: 999999;
    box-shadow: 0 0 12px limegreen;
    border: 1px solid limegreen;
    cursor: move;
    user-select: none;
  `;
  Object.entries(savedPosition).forEach(([k, v]) => fbxButton.style[k] = v);

  const fbxPanel = document.createElement('div');
  fbxPanel.id = 'fbx-panel';
  fbxPanel.style.cssText = `
    position: fixed;
    bottom: 60px;
    right: 20px;
    background: #111;
    color: white;
    padding: 10px;
    border-radius: 8px;
    font-size: 13px;
    font-family: sans-serif;
    z-index: 999998;
    box-shadow: 0 0 12px limegreen;
    border: 1px solid limegreen;
    width: 280px;
    display: none;
  `;
  fbxPanel.innerHTML = `
    <label><input type="checkbox" id="fbx-hide-sponsored"> Hide Sponsored Posts</label><br>
    <label><input type="checkbox" id="fbx-dark-theme"> Enable Dark Mode Theme</label><br><br>
    <textarea id="fbx-custom-css" placeholder="Enter custom CSS here..." style="width:100%;height:60px;background:#000;color:#0f0;border:1px solid limegreen;padding:4px;font-size:12px;"></textarea>
    <br><button id="fbx-save-settings" style="margin-top:8px;padding:4px 8px;background:#0f0;color:#000;border:none;cursor:pointer;">💾 Save Settings</button>
  `;
  document.body.appendChild(fbxPanel);

  // Apply saved state
  setTimeout(() => {
    document.getElementById('fbx-hide-sponsored').checked = savedSettings.hideSponsored;
    document.getElementById('fbx-dark-theme').checked = savedSettings.enableDarkTheme;
    document.getElementById('fbx-custom-css').value = savedSettings.customCSS;
  }, 200);

  // Save handler
  fbxPanel.querySelector('#fbx-save-settings').addEventListener('click', () => {
    const newSettings = {
      hideSponsored: document.getElementById('fbx-hide-sponsored').checked,
      enableDarkTheme: document.getElementById('fbx-dark-theme').checked,
      customCSS: document.getElementById('fbx-custom-css').value
    };
    localStorage.setItem('fbx-settings', JSON.stringify(newSettings));
    alert('✅ FBX settings saved. Reload Facebook to apply.');
  });

  fbxButton.addEventListener('click', () => {
    fbxPanel.style.display = fbxPanel.style.display === 'none' ? 'block' : 'none';
  });

  fbxButton.addEventListener('mousedown', function (e) {
    e.preventDefault();
    const shiftX = e.clientX - fbxButton.getBoundingClientRect().left;
    const shiftY = e.clientY - fbxButton.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      const left = pageX - shiftX;
      const top = pageY - shiftY;
      fbxButton.style.left = left + 'px';
      fbxButton.style.top = top + 'px';
      fbxButton.style.bottom = 'auto';
      fbxButton.style.right = 'auto';
      localStorage.setItem('fbx-button-position', JSON.stringify({
        left: fbxButton.style.left,
        top: fbxButton.style.top
      }));
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    fbxButton.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      fbxButton.onmouseup = null;
    };
  });

  fbxButton.ondragstart = () => false;

  document.body.appendChild(fbxButton);
  console.log('✅ FBX button + panel with settings injected');
}
