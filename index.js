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
import {InlineVue} from 'site-cl/js/Vue/InlineVue';

import ReviewsVue from './js/ReviewsVue.vue';

if(Site.Console !== undefined) {
	ReviewConsole.setup(Site.Console);
}

Site.Site.ready(() => {
    PageVue.create('div.cl-review', 'Review Vue', ReviewVue);
	InlineVue.create('div.cl-reviews', ReviewsVue);
});