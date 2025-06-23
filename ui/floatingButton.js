function injectFloatingButton() {
  if (document.getElementById('fbx-launcher')) return;

  // === Load saved position ===
  const savedPosition = JSON.parse(localStorage.getItem('fbx-button-position')) || {
    bottom: '20px',
    right: '20px'
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

  // Apply saved position
  Object.entries(savedPosition).forEach(([key, value]) => {
    fbxButton.style[key] = value;
  });

  // === Create panel ===
  const fbxPanel = document.createElement('div');
  fbxPanel.id = 'fbx-panel';
  fbxPanel.style.cssText = `
    position: fixed;
    bottom: 60px;
    right: 20px;
    background: #111;
    color: white;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-family: sans-serif;
    z-index: 999998;
    box-shadow: 0 0 12px limegreen;
    border: 1px solid limegreen;
    display: none;
  `;
  fbxPanel.innerHTML = `<strong>FBX Settings</strong><br>(More options coming soon...)`;
  document.body.appendChild(fbxPanel);

  // === Toggle panel ===
  fbxButton.addEventListener('click', () => {
    fbxPanel.style.display = fbxPanel.style.display === 'none' ? 'block' : 'none';
  });

  // === Draggable logic ===
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

      // Save position
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
  console.log('✅ FBX button + panel injected');
}
