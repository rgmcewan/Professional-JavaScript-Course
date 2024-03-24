import {
    DEFAUT_DISPLAY_TIME,
    errorTextEl,
    errorEl
} from '../common.js';

const renderError = (message = 'Add an arguement to renderError') => {
    errorTextEl.textContent = message;
        errorEl.classList.add('error--visible');

        // Remove class showing error after 3.5 seconds
        setTimeout(() => {
            errorEl.classList.remove('error--visible')
        }, DEFAUT_DISPLAY_TIME);
};

export default renderError;