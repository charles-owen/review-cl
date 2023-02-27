<template>
  <div class="content">
    <div class="full">
      <div v-for="submission in json.submissions" class="cl-submission-view">
        <h2>{{submission.name}}</h2>
        <pre v-if="submission.type === 'text'" class="cl-preview yellow-pad">{{submission.text}}</pre>
        <figure v-if="submission.type === 'image'" class="cl-preview"><img :src="previewImg(submission)"></figure>
        <p class="cl-preview-time">{{formatTime(submission.date)}}</p>
      </div>

<!--      <h2>Reviews</h2>-->
<!--      <form method="post" style="display: none;" @submit.prevent="submit">-->
<!--        <div ref="editor" class="shadow"></div>-->
<!--        <input type="submit" value="SUBMIT">-->
<!--      </form>-->

      <!--   Zhuofan Zeng code for week4  -->
<!--      <h2>Review & Chat</h2>-->
      <h3 style="text-align: center;background: #00723f;color: white;">Review & Chat</h3>
      <p class="cl-reviews-none" v-if="reviewing.length === 0">  <!-- v-if determines whether the length of the reviewing is 0-->
        *** None Yet ***
      </p>
      <div v-for="review in reviewing" class="cl-review"> <!--   v-for loop reviewing, the return value of each loop review  -->
        <p v-if="review.isReview"><strong>Reviewee:</strong></p >
        <p v-else=""><strong>Me:</strong></p >
        <div class="cl-review-present">{{review.meta.review.review}}<!--   review.meta.review.review takes the value, also inside the loop  -->
          <p style="font-size: 10px; color: green;">{{formatTime(review.time)}}
          </p><!--   review.time takes value of time  -->
        </div>
      </div>

      <form method="post" @submit.prevent="submit">
        <div ref="editor" class="shadow"></div>
        <input type="submit" value="Send">
      </form>
      <!--   Zhuofan Zeng code for week4  end -->
    </div>
  </div>
</template>

<script>
import {UserVueBase} from 'users-cl/index'

/**
 * This is the page for a review of an assignment by a member.
 * /cl/review/:id
 * @constructor ReviewVue
 */
export default {
  'extends': UserVueBase,
  props: ['json'],
  data: function () {
    return {
      reviewing: [],
      submissions: {}
    }
  },
  mounted() {
    this.setTitle('Peer Reviewing');
    this.reviewing = this.json.reviewing;

    const element = this.$refs['editor'];
    this.editor = new this.$site.Editor(element, {
      height: '1em',
      classes: ['#F3F3F3']
    });

    let submissions = {};
    for (const submission of this.json.submissions) {
      submissions[submission.tag] = {
        'id': submission.id,
        'date': submission.date
      };
    }

    this.submissions = submissions;
  },
  methods: {
    submit() {
      const text = this.editor.textarea.value.trim();
      if (text === '') {
        Site.toast(this, 'You must enter some text to submit');
        return;
      }

      let params = {
        type: 'text/plain',
        text: text,
        submissions: this.submissions
      }
      // Request backend data API
      this.$site.api.post(`/api/review/review/${this.json.id}`, params)
          .then((response) => {
            if (!response.hasError()) {
              this.editor.textarea.value = '';
              this.reviewing = response.getData('reviewing').attributes;

              this.$site.toast(this, "Review successfully saved to the server");
            } else {
              this.$site.toast(this, response);
            }

          })
          .catch((error) => {
            this.$site.toast(this, error);
          });
    },
    formatTime(time) {
      return this.$site.TimeFormatter.relativeUNIX(time, null);
    },
    showSubmissions(review) {
      let past = false;
      const submissions = review.meta.review.submissions;
      for (let tag in submissions) {
        if (submissions[tag].id !== this.submissions[tag].id) {
          past = true;
        }
      }

      if (past) {
        return 'For a past submission';
      }

      return '';
    },
    previewImg(submission) {
      return this.$site.root + '/cl/review/img/' + submission.id;
    }
  }
}
</script>
