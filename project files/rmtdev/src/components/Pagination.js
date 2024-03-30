import {
    RESULTS_PER_PAGE,
    state,
    paginationEl,
    paginationNumberNextEl,
    paginationNumberBackEl,
    paginationBtnNextEl,
    paginationBtnBackEl,
} from '../common.js';
import renderJobList from './JobList.js';

const renderPaginationButtons = () => {
    // display back button if on page 1 or further
    if (state.currentPage > 1) {
        paginationBtnBackEl.classList.remove('pagination__button--hidden');
    } else {
        paginationBtnBackEl.classList.add('pagination__button--hidden');
    }

    // display next button if there are more job items on the next page
    if ((state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE) <= 0) {
        paginationBtnNextEl.classList.add('pagination__button--hidden');
    } else {
        paginationBtnNextEl.classList.remove('pagination__button--hidden');
    }

    // update page numbers
    paginationNumberNextEl.textContent = state.currentPage++;
    paginationNumberNextEl.textContent = state.currentPage--;

    // unfocus ('blur") buttons
    paginationBtnNextEl.blur();
    paginationBtnBackEl.blur();
};

const clickHandler = event => {
    // get clicked button element
    const clickedButtonEl = event.target.closest('.pagination__button');

    // stop the function if null
    if (!clickedButtonEl) return;

    // check if intention is "next" or "back"?
    const nextPage = clickedButtonEl.className.includes('--next') ? true : false; // boolean stored in nextPage

    // update state
    nextPage ? state.currentPage++ : state.currentPage--;

    // render pagination buttons
    renderPaginationButtons();

    // render job items for that page
    renderJobList();
};

paginationEl.addEventListener('click', clickHandler);

export default renderPaginationButtons;