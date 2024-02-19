// -- GLOBAL --
const MAX_CHARS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl = document.querySelector('.feedbacks');
const submitBtnEl = document.querySelector('.submit-btn');
const spinnerEl = document.querySelector('.spinner');
const hashtagListEl = document.querySelector('.hashtags');


// -- NEW FEEDBACK ITEM --


const renderFeedbackItem = feedbackItem => {
    // new feedback item (inserting HTML)
    const feedbackItemHTML = `
        <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${feedbackItem.upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${feedbackItem.company}</p>
                <p class="feedback__text">${feedbackItem.text}</p>
            </div>
            <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
        </li>
    `;

    // Insert new feedback item into list
    feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);
};

// -- COUNTER COMPONENT --
(() => {
    const inputHandler = () => {
        // determine maximum number of characters
        const maxNrChars = MAX_CHARS;
    
        // determine number of characters the user has typed
        const nrCharsTyped = textareaEl.value.length;
    
        // claculate number of characters left (max - currently typed)
        const charsLeft = maxNrChars - nrCharsTyped;
    
        // Show numer of chars left
        counterEl.textContent = charsLeft;
    };
    
    
    textareaEl.addEventListener('input', inputHandler);
})();



// -- FORM COMPONENT --
(() => {
    const showVisualIndicator = textCheck => {
        const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';
        // show valid indicator (green outline)
        formEl.classList.add(className);
            
        // remove the visual indicator
        setTimeout(() => {
            formEl.classList.remove(className)
        }, 2000);
    };
    
    const submitHandler = event => {
        //prevent default browser action (submitting form data to the 'action' address and loading a new page)
        event.preventDefault();
    
        // get text from the text area
        const text = textareaEl.value;
        
        // validate test (eg check if hashtag is present and text is long enough)
        if (text.includes('#') && (text.length > 4)) {
            showVisualIndicator('valid');
        } else {
            showVisualIndicator('invalid');
    
        // focus the text area again
        textareaEl.focus();
        
        // stop this function executing if the form is invalid
        return;
    }
    
        // we have text that is valid, now extract other info from that text
        const hashtag = text.split(' ').find(word => word.includes('#'));
        // const hashtag = text.split(' ');
        // const company;
        const company = hashtag.substring(1);
        // const badgeLetter;
        const badgeLetter = company.substring(0, 1).toUpperCase();
        const upvoteCount = 0;
        const daysAgo = 0;
    
        // create feedback item in list
        const feedbackItem = {
            upvoteCount: upvoteCount,  // Because they are the same name you could remove the second variable and the colon
            company: company,           // same goes here and for the rest...
            badgeLetter: badgeLetter,
            daysAgo: daysAgo,
            text: text
        };
        // render feedback item
        renderFeedbackItem(feedbackItem);
    
        // send feedback item to server
        fetch(`${BASE_API_URL}/feedbacks`, {
        // fetch('/feedbacks', {
    
        method: 'POST',
            body: JSON.stringify(feedbackItem),
            headers: {
                Accept: 'application/json',
                'Conent-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                console.log('Something went wrong');
                return;
            }
            console.log('Successfully Submitted');
        }).catch(error => console.log(error));
    
        // clear the text area
        textareaEl.value = '';
    
        // blur the submit button
        submitBtnEl.blur();
        // reset the counter
        counterEl.textContent = MAX_CHARS;
        
        //test the submit and get information about the event in the console (NOT IN COURSE CODE)
        console.log(text);
        console.log(1);
        console.log(event);
        console.log(company);
        console.log(badgeLetter);
    };
    
    formEl.addEventListener('submit', submitHandler);
})();



// -- FEEDBACK LIST COMPONENT --
(() => {
    const clickHandler = event => {
        // get clicked HTML element
        const clickedEl = event.target
    
        // determine if user intended to upvote or expand
        const upvoteIntention = clickedEl.className.includes('upvote');
    
        // run appropriate logic for each item
        if (upvoteIntention) {
            
            // get the closest upvote button
            const upvoteBtnEl = clickedEl.closest('.upvote');
    
            // disable upvote button
            upvoteBtnEl.disabled = true;
    
            // select the upvote count element within the upvote button
            const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count');
    
            // get currently displayed upvote count as a number (+ converts from a string(default) to a number)
            let upvoteCount = +upvoteCountEl.textContent;
    
            // increment upvoteCount by 1 (one)
    
            // commented this out due to adding 1 in the next line using ++ // upvoteCount++;
    
            // set update count in HTML
            upvoteCountEl.textContent = ++upvoteCount; // ++ before variable name will increment first then assign otherwise it will assign then update
    
            // added some extra stuff in the console log
            console.log(typeof upvoteCount, 'is the type of variable and the number is', upvoteCount);
    
        } else {
            // expand the clicked feedback item
            clickedEl.closest('.feedback').classList.toggle('feedback--expand');
        }
    };
    
    feedbackListEl.addEventListener('click', clickHandler);
    
    fetch(`${BASE_API_URL}/feedbacks`)
    // fetch('/feedbacks')
    
    
        .then(response => response.json())
        .then(data => {
            // remove spinner
            spinnerEl.remove();
    
            //iterate over each element in feedbacks array then render it in the list
            data.feedbacks.forEach(feedbackItem => renderFeedbackItem(feedbackItem));
        })
    .catch(error => {
        feedbackListEl.textContent = `Failed to fetch feedback items. Error Message: ${error.message}`
    });

})();



// -- HASHTAG LIST COMPONENT --

(() => {
    const clickHandler2 = event => {
        const clickedEl = event.target;
    
        // stop function if click happens in list but outside buttons
        // if(clickedEl.className === 'hashtags') {
        //     return;
        // }
    
        // another simple way to write the same above if statement
        if (clickedEl.className === 'hashtags') return;
    
        // extract company name from the button clicked on
        const companyNameFromHashtag = clickedEl.textContent.substring(1).toLowerCase().trim();
    
        // iterate over each feedback item in the list
        feedbackListEl.childNodes.forEach(childNode => {
            // stop this iteration if its  a text node
            if (childNode.nodeType === 3) return;
    
            // extract company name
            const companyNameFromFeedbackItem = childNode.querySelector('.feedback__company').textContent.toLowerCase().trim();
    
            // remove feedback items if company names are not equal 
            if (companyNameFromHashtag !== companyNameFromFeedbackItem) {
                childNode.remove();
            }
        });
    
        console.log(clickedEl);
    };
    
    hashtagListEl.addEventListener('click', clickHandler2);
})();
