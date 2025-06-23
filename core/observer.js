export function observeDOM() {
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                // You can call features here based on config
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
