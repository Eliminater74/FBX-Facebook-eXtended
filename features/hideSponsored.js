export function hideSponsored() {
    const adLabels = ['[aria-label="Sponsored"]', 'span:contains("Sponsored")'];
    adLabels.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            const container = el.closest('div[data-pagelet]');
            if (container) container.style.display = 'none';
        });
    });
}
