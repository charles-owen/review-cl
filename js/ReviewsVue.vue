<template>
  <div class="cl-reviews">
    <h3>Reviews of this assignment appear here.</h3>
    <p class="cl-reviews-none" v-if="reviews.length === 0">*** None Yet ***</p>
    <div v-for="review in reviews" class="cl-review">
      <h3 :class="review.role !== undefined ? 'staff' : ''">{{formatTime(review.time)}}
        <span v-if="review.role !== undefined">Staff Review</span>
        <span v-else>Review</span> by {{review.by}}
        <span class="cl-submitted">{{showSubmissions(review)}}</span></h3>
      <pre>{{review.review}}</pre>
    </div>
  </div>
</template>

<script>
	import {TimeFormatter} from 'site-cl/js/TimeFormatter';

  export default {
  	props: ['json'],
    data: function() {
  		return {
  			assignTag: '',
        reviews: []
      }
    },
    mounted() {
  		this.assignTag = this.json.assignTag;
  		this.reviews = this.json.reviews;
    },
    methods: {
      formatTime(time) {
        return TimeFormatter.relativeUNIX(time, null);
      },
	    showSubmissions(review) {
      	let ret = '';
      	for(let tag in review.submissions) {
      		ret += TimeFormatter.absoluteUNIX(review.submissions[tag].date);
        }

        if(ret === '') {
        	return '';
        }

      	return 'Submission: ' + ret;
      }
    }
  }
</script>