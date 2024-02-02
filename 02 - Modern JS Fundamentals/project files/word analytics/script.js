const textareaEl = document.querySelector('.textarea');
const charactersNumberEl = document.querySelector('.stat__number--characters');
const twitterNumberEl = document.querySelector('.stat__number--twitter');
const facebookNumberEl = document.querySelector('.stat__number--facebook');
const wordsNumberEl = document.querySelector('.stat__number--words');

textareaEl.addEventListener('input', function() {
    // determine new numbers
    const numberOfCharacters = textareaEl.value.length;

    // set new numbers
    charactersNumberEl.textContent =  numberOfCharacters;
});