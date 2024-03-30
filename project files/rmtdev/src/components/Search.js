import {
    BASE_API_URL,
    state,
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    getData
} from '../common.js';

import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

// -- SEARCH COMPONENT --
const submitHandler = async event => {
    // prevent default behaviour
    event.preventDefault();

    // get search text
    const searchText = searchInputEl.value;

    // validation (regular expression example)
    const forbiddenPattern = /[0-9]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError('Your search may not contain numbers');
        return;
    }

    // blur input
    searchInputEl.blur();

    //remove previous job items from last search
    jobListSearchEl.innerHTML = '';

    // reset sorting buttons
    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');

    // render spinner
    renderSpinner('search');

    // fetch search results
    try {
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

        //rxtract job items
        const { jobItems } = data;

        // update state
        state.searchJobItems = jobItems;
        state.currentPage = 1;

        // remove spinner
        renderSpinner('search');

        // render number of results
        numberEl.textContent = jobItems.length;

        // reset pagination buttons
        renderPaginationButtons();

        // render job items in the search job list
        renderJobList();

    } catch (error) {
        renderSpinner('search'),
        renderError(error.message);
    }


    // -- OLD SYNTAX --

    // fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    //     .then(response => {
    //         if (!response.ok) { // 4xx, 5xx status code
    //             throw new Error('Resource Issue (E.G. Resource doesn\'t exist or server issue');
    //             }

    //         return response.json();
    //     })
    //     .then(data => {
    //         //rxtract job items
    //         const { jobItems } = data;

    //         // remove spinner
    //         renderSpinner('search');

    //         // render number of results
    //         numberEl.textContent = jobItems.length;

    //         // render job items in the search job list
    //         renderJobList(jobItems);
    //     })
    //     .catch(error => { // network problem or other errors (e.g. trying to parse something not JSON as JSON)

    //         renderSpinner('search'),
    //         renderError(error.message);
    //     });

    
};

searchFormEl.addEventListener('submit', submitHandler);