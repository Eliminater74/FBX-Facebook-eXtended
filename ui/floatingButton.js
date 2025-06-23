function injectFloatingButton() {
  if (document.getElementById('fbx-launcher')) return;

  const fbxButton = document.createElement('div');
  fbxButton.id = 'fbx-launcher';
  fbxButton.textContent = '⚙ FBX Panel';

  fbxButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
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

  fbxButton.addEventListener('click', () => {
    alert('🧠 FBX Panel Clicked! (UI coming soon)');
  });

  // Draggable logic
  fbxButton.addEventListener('mousedown', function (e) {
    e.preventDefault();
    const shiftX = e.clientX - fbxButton.getBoundingClientRect().left;
    const shiftY = e.clientY - fbxButton.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      fbxButton.style.left = pageX - shiftX + 'px';
      fbxButton.style.top = pageY - shiftY + 'px';
      fbxButton.style.bottom = 'auto';
      fbxButton.style.right = 'auto';
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
  console.log('✅ FBX button injected');
}
