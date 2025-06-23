document.getElementById('save').addEventListener('click', () => {
  const settings = {
    hideSponsored: document.getElementById('hideSponsored').checked,
    theme: document.getElementById('themeSelect').value,
    customCSS: document.getElementById('customCSS').value
  };
  chrome.storage.sync.set(settings, () => {
    alert('Settings saved!');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(null, (settings) => {
    document.getElementById('hideSponsored').checked = settings.hideSponsored || false;
    document.getElementById('themeSelect').value = settings.theme || 'dark';
    document.getElementById('customCSS').value = settings.customCSS || '';
  });
});
