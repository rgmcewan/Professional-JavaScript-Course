const increaseButtonEl = document.querySelector('.counter__button--increase');
const counterValueEl = document.querySelector('.counter__value')

increaseButtonEl.addEventListener('click', function() {
    // get current value of counter
    const currnetValue = counterValueEl.textContent;
    

    //convert valye to number type
    const currnetValueAsNumber = +currnetValue;

    //increment by 1

    //set counter element with new value
    counterValueEl.textContent = 1;
})
