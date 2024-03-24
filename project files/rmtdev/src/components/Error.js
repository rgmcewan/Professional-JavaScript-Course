import {
    errorTextEl,
    errorEl
} from '../common.js';

const renderError = message => {
    errorTextEl.textContent = message;
        errorEl.classList.add('error--visible');

        // Remove class showing error after 3.5 seconds
        setTimeout(() => {
            errorEl.classList.remove('error--visible')
        }, 3500);
};

export default renderError;