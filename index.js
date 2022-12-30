/*
 * The main Review system entry point
 */

import './_review.scss';
import {ReviewConsole} from './js/Console/ReviewConsole';
import ReviewVue from './js/ReviewVue.vue';
import ReviewsVue from './js/ReviewsVue.vue';

if(!Site.Review) {
	//
	// Install the console components
	//
	if(Site.Console !== undefined) {
		ReviewConsole.setup(Site.Console)
	}

	//
	// Create the inline and page components
	//
	Site.ready(() => {
		Site.PageVue.create('div.cl-review', 'Review Vue', ReviewVue)
		Site.InlineVue.create('div.cl-reviews', ReviewsVue)
	})

	Site.Review = true
}
