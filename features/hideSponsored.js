// FBX: Sponsored Content Hider

function hideSponsored() {
  const selectors = [
    'span:contains("Sponsored")',
    'span:contains("Suggested for you")'
  ];

  selectors.forEach((textMatch) => {
    document.querySelectorAll('span')
      .forEach(span => {
        if (span.innerText && span.innerText.includes("Sponsored")) {
          let post = span.closest('[role="article"]');
          if (post) {
            post.style.display = 'none';
            console.log('🚫 Hiding Sponsored post.');
          }
        }
      });
  });
}
