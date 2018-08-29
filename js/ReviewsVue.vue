<template>
  <div class="cl-reviews">
    <h3>Reviews of this assignment appear here.</h3>
    <div v-for="review in reviews" class="cl-review">
      <h3 :class="review.role !== undefined ? 'staff' : ''">{{formatTime(review.time)}}
        <span v-if="review.role !== undefined">Staff Review</span>
        <span v-else>Review</span> by {{review.by}}</h3>
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
        reviews: null
      }
    },
    mounted() {
  		this.assignTag = this.json.assignTag;
  		this.reviews = this.json.reviews;

  		console.log(this.reviews);
  		// this.assignTag = this.json.assignment.tag;
      //
  		// let params = {
      //
  		// }
  		// Site.api.get('/api/review/reviews/' + this.assignTag, params)
  		//     .then((response) => {
  		//         if (!response.hasError()) {
  		//         	this.reviews = response.getData('reviews').attributes;
  		// console.log(this.reviews);
  		//         } else {
  		//             Site.toast(this, response);
  		//         }
      //
  		//     })
  		//     .catch((error) => {
  		//         Site.toast(this, error);
  		//     });
      //
  		// console.log(this.json.assignment.tag);
    },
    methods: {
      formatTime(time) {
        return TimeFormatter.relativeUNIX(time, null);
      }
    }
  }
</script>