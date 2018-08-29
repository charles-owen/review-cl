<template>
  <div class="cl-reviews">
    <h2>Staff Review</h2>
    <form method="post" @submit.prevent="submit">
      <div ref="editor" class="shadow"></div>
      <p><input type="submit" value="Submit Review"></p>
    </form>

    <h3>Reviews by this user.</h3>
    <p v-if="byReviews.length  === 0" class="center">None</p>
    <div v-for="review in byReviews" class="cl-review">
      <h3 :class="review.reviewee.atLeast(staffRole) ? 'staff' : ''">{{formatTime(review.time)}} Review by {{review.reviewee.name}}</h3>
      <pre>{{review.meta.review.review}}</pre>
    </div>
    <h3>Reviews of this user's assignment.</h3>
    <p v-if="forReviews.length  === 0" class="center">None</p>
    <div v-for="review in forReviews" class="cl-review">
      <h3 :class="review.reviewer.atLeast(staffRole) ? 'staff' : ''">{{formatTime(review.time)}}
        <span v-if="review.reviewer.atLeast(staffRole)">Staff Review</span>
        <span v-else>Review</span> by {{review.reviewer.name}}</h3>
      <pre>{{review.meta.review.review}}</pre>
    </div>

  </div>
</template>

<script>
	import {TimeFormatter} from 'site-cl/js/TimeFormatter';
  import {Editor} from 'site-cl/js/UI/Editor';
  import {Member} from 'course-cl/js/Members/Member';

  export default {
  	props: ['user', 'assigntag'],
    data: function() {
  		return {
        forReviews: [],
        byReviews: [],
        staffRole: Member.STAFF
      }
    },
    mounted() {
	    const element = this.$refs['editor'];
	    this.editor = new Editor(element, {
		    height: '10em',
		    classes: ['yellow-pad']
	    });

  		Site.api.get('/api/review/reviews/' + this.assigntag + '/' + this.user.member.id, {})
  		    .then((response) => {
  		        if (!response.hasError()) {
  		        	this.take(response);
  		        } else {
  		            Site.toast(this, response);
  		        }

  		    })
  		    .catch((error) => {
  		        Site.toast(this, error);
  		    });
    },
	  methods: {
  		take(response) {
        let data = response.getData('reviews-by-for').attributes;
        for(let review of data.for) {
	        review.reviewer = new Users.User(review.reviewer);
        }
        for(let review of data.by) {
	        review.reviewee = new Users.User(review.reviewee);
        }

        this.forReviews = data.for;
        this.byReviews = data.by;
 console.log(this.forReviews);

      },
	    submit() {
		    const text = this.editor.textarea.value.trim();
		    if(text === '') {
			    Site.toast(this, 'You must enter some text to submit');
			    return;
		    }

		    let params = {
			    type: 'text/plain',
			    text: text
		    }

		    Site.api.post(`/api/review/staffreview/${this.assigntag}/${this.user.member.id}`, params)
			    .then((response) => {
				    if (!response.hasError()) {
					    this.editor.textarea.value = '';
					    this.take(response);
console.log(response);

					    Site.toast(this, "Review successfully saved to the server");
				    } else {
					    Site.toast(this, response);
				    }

			    })
			    .catch((error) => {
				    Site.toast(this, error);
			    });
	    },
		  formatTime(time) {
			  return TimeFormatter.relativeUNIX(time, null);
		  }
	  }
  }
</script>