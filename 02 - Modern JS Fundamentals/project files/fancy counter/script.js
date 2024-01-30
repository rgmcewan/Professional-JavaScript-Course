const increaseButtonEl = document.querySelector('.counter__button--increase');
const decreaseButtonEl = document.querySelector('.counter__button--decrease');
const resetButtonEl = document.querySelector('.counter__reset-button');
const counterValueEl = document.querySelector('.counter__value')

resetButtonEl.addEventListener('click', function() {
    //set counter value to zero
    counterValueEl.textContent = 0;
});


decreaseButtonEl.addEventListener('click', function() {
    // get cuttent value of the counter
    const currentValue = counterValueEl.textContent;

    // convert the value to number type
    const currnetValueAsNumber = +currentValue;

    // decrement by 1
    let newValue = currnetValueAsNumber - 1;

    // check if new value is less than zero
    if(newValue < 0) {
    // if it is less than zero then force it to be zero
        newValue = 0;
    }

    // update counter value with new value
    counterValueEl.textContent = newValue;
});

function incrementCounter() {
    // get current value of counter
    const currnetValue = counterValueEl.textContent;
    

    //convert valye to number type
    const currnetValueAsNumber = +currnetValue;

    //increment by 1
    const newValue = currnetValueAsNumber + 1;

    //set counter element with new value
    counterValueEl.textContent = newValue;
}

increaseButtonEl.addEventListener('click', incrementCounter);

document.addEventListener('keydown', incrementCounter);