/*
 * The main Review system entry point
 */

import './_review.scss';
import ReviewVue from './js/ReviewVue.vue';
import ReviewsVue from './js/ReviewsVue.vue';
import {ChatFactory} from './js/ChatFactory.js'

if(!Site.Review) {
	//
	// Create the inline and page components
	//
	Site.ready(() => {
		Site.PageVue.create('div.cl-review', 'Review Vue', ReviewVue)
		Site.InlineVue.create('div.cl-reviews', ReviewsVue)
	})

	Site.Review = true
}

if(!Site.Chat) {
  let Chat = ChatFactory(Site);
  Site.Chat = Chat;
}
