<template>
  <div class="content">
    <div class="full">
    <div v-for="submission in json.submissions" class="cl-submission-view">
      <h2>{{submission.name}}</h2>
      <pre v-if="submission.type === 'text'" class="cl-preview yellow-pad">{{submission.text}}</pre>
      <figure v-if="submission.type === 'image'" class="cl-preview"><img :src="previewImg(submission)"></figure>
      <p class="cl-preview-time">{{formatTime(submission.date)}}</p>
    </div>

    <h2>Review</h2>
    <form method="post" @submit.prevent="submit">
      <div ref="editor" class="shadow"></div>
      <p><input type="submit" value="Submit Review"></p>
    </form>

    <h2>Previous Reviews</h2>
    <p class="cl-reviews-none" v-if="reviewing.length === 0">*** None Yet ***</p>
    <div v-for="review in reviewing" class="cl-review">
      <h3>{{formatTime(review.time)}} Review by Me
      <span class="cl-submitted">{{showSubmissions(review)}}</span></h3>
      <pre>{{review.meta.review.review}}</pre>
    </div>
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
        reviewing: [],
        submissions: {}
			}
		},
		mounted() {
			this.setTitle('Peer Reviewing');
			this.reviewing = this.json.reviewing;

		  const element = this.$refs['editor'];
      this.editor = new Editor(element, {
        height: '10em',
        classes: ['yellow-pad']
      });

      let submissions = {};
      for(const submission of this.json.submissions) {
        submissions[submission.tag]={
          'id': submission.id,
          'date': submission.date
        };
      }

      this.submissions = submissions;
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
          text: text,
          submissions: this.submissions
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
      },
      showSubmissions(review) {
        let past = false;
        const submissions = review.meta.review.submissions;
        for(let tag in submissions) {
        	if(submissions[tag].id !== this.submissions[tag].id) {
        		past = true;
          }
        }

        if(past) {
        	return 'For a past submission';
        }

        return '';
      },
      previewImg(submission) {
	      return Site.root + '/cl/review/img/' + submission.id;
      }
		}
	}
</script>