import {
    sortingEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl
} from '../common.js';

const clickHandler = event => {
    // get the clicked button element
    const clickedButtonEl = event.target.closest('.sorting__button');

    // stop function if no clicked button element
    if (!clickedButtonEl) return;

    // check if intention is recent or relevant sorting
    const recent = clickedButtonEl.classname.includes('--recent') ? true : false; //boolean

    // sort the job items
    if (recent) {

    } else {

    }

};

sortingEl.addEventListener('click', clickHandler);