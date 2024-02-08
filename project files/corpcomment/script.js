const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');

const inputHandler = () => {
    // determine maximum number of characters
    const maxNrChars = 150;

    // determine number of characters the user has typed
    const nrCharsTyped = textareaEl.value.length;

    // claculate number of characters left (max - currently typed)
    const charsLeft = maxNrChars - nrCharsTyped;

    // Show numer of chars left
    counterEl.textContent = charsLeft;
};


textareaEl.addEventListener('input', inputHandler);