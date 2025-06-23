import { observeDOM } from './observer.js';
import { hideSponsored } from '../features/hideSponsored.js';

document.addEventListener('DOMContentLoaded', () => {
    observeDOM();
    hideSponsored();
});
