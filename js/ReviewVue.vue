<template>
  <div class="content">
    <div v-for="submission in json.submissions" class="cl-submission-view">
      <h2>{{submission.name}}</h2>
      <pre class="cl-preview yellow-pad">{{submission.text}}</pre>
    </div>

    <h2>Review</h2>
    <form method="post" @submit.prevent="submit">
      <div ref="editor" class="shadow"></div>
      <p><input type="submit" value="Submit Review"></p>
    </form>

    <h2>Previous Reviews</h2>
    <div v-for="review in reviewing" class="cl-review">
      <h3>{{formatTime(review.time)}} Review by Me</h3>
      <pre>{{review.meta.review.review}}</pre>
    </div>
  </div>
</template>

<script>
	import UserVueBase from 'users-cl/js/Vue/UserVueBase.vue';
  import {Editor} from 'site-cl/js/UI/Editor';
  import {TimeFormatter} from 'site-cl/js/TimeFormatter';

	export default {
		'extends': UserVueBase,
		props: ['json'],
		data: function() {
			return {
        reviewing: []
			}
		},
		mounted() {
			this.setTitle('Review Vue');

			this.reviewing = this.json.reviewing;

		  const element = this.$refs['editor'];
      this.editor = new Editor(element, {
        height: '10em',
        classes: ['yellow-pad']
      });
		},
		methods: {
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

		  Site.api.post(`/api/review/review/${this.json.id}`, params)
			  .then((response) => {
				  if (!response.hasError()) {
					  this.editor.textarea.value = '';
					  this.reviewing = response.getData('reviewing').attributes;

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