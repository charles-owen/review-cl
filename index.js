/**
 * @file
 * The main Review system entry point
 */

//
// Install the console components
//
import './_review.scss';
import {ReviewConsole} from './js/Console/ReviewConsole';
import ReviewVue from './js/ReviewVue.vue';
import {PageVue} from 'site-cl/js/Vue/PageVue';

import ReviewsVue from './js/ReviewsVue.vue';

Site.Review = {
	'ReviewsVue': ReviewsVue
}

if(Site.Console !== undefined) {
	ReviewConsole.setup(Site.Console);
}

Site.Site.ready(() => {
    PageVue.create('div.cl-review', 'Review Vue', ReviewVue);
});