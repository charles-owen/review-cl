/*
 * The main Review system entry point
 */

import './_review.scss';
import {ReviewConsole} from './js/Console/ReviewConsole';
import ReviewVue from './js/ReviewVue.vue';
import ReviewsVue from './js/ReviewsVue.vue';

//
// Install the console components
//
if(Site.Site.console !== undefined) {
	ReviewConsole.setup(Site.Site.console);
}

//
// Create the inline and page components
//
Site.Site.ready(() => {
    Site.Site.PageVue.create('div.cl-review', 'Review Vue', ReviewVue);
	Site.Site.InlineVue.create('div.cl-reviews', ReviewsVue);
});