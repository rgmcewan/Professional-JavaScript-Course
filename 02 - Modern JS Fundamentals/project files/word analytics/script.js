const textareaEl = document.querySelector('.textarea');
const charactersNumberEl = document.querySelector('.stat__number--characters');
const twitterNumberEl = document.querySelector('.stat__number--twitter');
const facebookNumberEl = document.querySelector('.stat__number--facebook');
const wordsNumberEl = document.querySelector('.stat__number--words');

textareaEl.addEventListener('input', function() {
    // determine new numbers
    const numberOfCharacters = textareaEl.value.length;
    const twitterCharactersLeft = 280 - numberOfCharacters;
    const facebookCharactersLeft = 2200 - numberOfCharacters;

    // add visual indicator if limit is exceeded
    if (twitterCharactersLeft < 0) {
        twitterNumberEl.classList.add('stat__number--Limit');
    } else {
        twitterNumberEl.classList.remove('stat__number--Limit');
    }
    if (facebookCharactersLeft < 0) {
        facebookNumberEl.classList.add('stat__number--Limit');
    } else {
        facebookNumberEl.classList.remove('stat__number--Limit');
    }

    // set new numbers
    charactersNumberEl.textContent =  numberOfCharacters;
    twitterNumberEl.textContent = twitterCharactersLeft;
    facebookNumberEl.textContent = facebookCharactersLeft

});