// -- GLOBAL --
const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');

// COUNTER COMPONENT

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



// SUBMIT COMPONENT

const submitHandler = event => {
    //prevent default browser action (submitting form data to the 'action' address and loading a new page)
    event.preventDefault();

    // get text from the text area
    const text = textareaEl.value;
    
    // validate test (eg check if hashtag is present and text is long enough)
    if (text.includes('#') && (text.length > 4)) {
        // show valid indicator (green outline)
        formEl.classList.add('form--valid');
        
        // remove the visual indicator
        setTimeout(() => {
            formEl.classList.remove('form--valid')
        }, 2000);
    } else {
        // show invalid indicator (red outline)
        formEl.classList.add('form--invalid');
        setTimeout(() => {
            formEl.classList.remove('form--invalid')
    }, 2000);

    // focus the text area again
    textareaEl.focus();
}


    //test the submit and get information about the event in the console (NOT IN COURSE CODE)
    console.log(text);
    console.log(1);
    console.log(event);
};

formEl.addEventListener('submit', submitHandler);