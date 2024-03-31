import {
    BASE_API_URL,
    state,
    jobDetailsContentEl,
    getData,
} from '../common.js';
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';
import renderJobList from './JobList.js';


const loadHashChangeHandler = async () => {
    // get the id from the URL
    const id = window.location.hash.substring(1);

    if (id) {
        // removethe active class from previously active job items
        document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass => jobItemWithActiveClass.classList.remove('job-item--active'));

        // remove previous job details content
        jobDetailsContentEl.innerHTML = '';

        // add spinner
        renderSpinner('job-details');

        try {
            const data = await getData(`${BASE_API_URL}/jobs/${id}`);
    
            // extract job item
            const { jobItem } = data;
    

            // update state
            state.activeJobItem = jobItem;

            // render search job list
            renderJobList();

            // remove spinner
            renderSpinner('job-details');
    
            // render job details
            renderJobDetails(jobItem);
        } catch (error) {
            renderSpinner('job-details'),
                renderError(error.message);
        }
    }
};

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler) // REFRESH WINDOW WHEN THE URL HASH CHANGES
