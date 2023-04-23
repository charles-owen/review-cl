<template>
  <div class="cl-reviews">
    <h2>Staff Review</h2>
    <form method="post" @submit.prevent="submit">
      <div ref="editor"></div>
      <p><input type="submit" value="Submit Review"></p>
    </form>

    <h3>Reviews by this user.</h3>
    <p v-if="byReviews.length  === 0" class="center">None</p>
    <div v-for="review in byReviews" class="cl-review">
      <h3 :class="review.reviewee.atLeast(staffRole) ? 'staff' : ''">{{formatTime(review.time)}}
        <span v-if="review.meta.review.context === 'reviewee'">Chat by {{review.reviewee.name}}</span>
        <span v-else>Review by {{user.name}} of {{review.reviewee.name}}</span>
        <span class="cl-submitted">{{showSubmissions(review)}}</span></h3>
      <div class="cl-review-present"><span v-if="review.meta.review.status === 'deleted'" style="font-weight: bold">Deleted: </span>{{review.meta.review.review}}</div>
    </div>
    <h3>Reviews of this user's assignment.</h3>
    <p v-if="forReviews.length  === 0" class="center">None</p>
    <div v-for="review in forReviews" class="cl-review">
      <h3 :class="review.reviewer.atLeast(staffRole) ? 'staff' : ''">{{formatTime(review.time)}}
        <span v-if="review.reviewer.atLeast(staffRole)">Staff Review</span>
        <span v-else-if="review.meta.review.context === 'reviewer'">Review</span>
        <span v-else>Chat</span> by
        <span v-if="review.meta.review.context === 'reviewee'"> {{user.name}} to {{review.reviewer.name}}</span>
        <span v-else> {{review.reviewer.name}} </span>
        <span class="cl-submitted">{{showSubmissions(review)}}</span></h3>
      <div class="cl-review-present">{{review.meta.review.review}}</div>
    </div>

  </div>
</template>

<script>

import ReviewsVueVue from '../ReviewsVue.vue';

/**
 * Present reviews by and for a member and the staff reviewing form.
 * @constructor ReviewsByForMemberVue
 */
export default {
  props: ['user', 'assigntag'],
  data: function () {
    return {
      forReviews: [],
      byReviews: [],
      staffRole: Site.Member.STAFF,
      submissions: []
    }
  },
  components: {
    reviewsVue : ReviewsVueVue
  },
  watch: {
    user() {
      this.forReviews = [];
      this.byReviews = [];
      this.submissions = [];
      this.fetch();
    }
  },
  mounted() {
    const element = this.$refs['editor'];
    this.editor = new this.$site.Editor(element, {
      height: '10em',
      classes: ['yellow-pad']
    });

    this.fetch();
  },
  methods: {
    fetch() {
      this.$site.api.get('/api/review/reviews/' + this.assigntag + '/' + this.user.member.id, {})
          .then((response) => {
            if (!response.hasError()) {
              this.take(response);
            } else {
              this.$site.toast(this, response);
            }

          })
          .catch((error) => {
            this.$site.toast(this, error);
          });
    },
    take(response) {
      let data = response.getData('reviews-by-for').attributes;
      let submitData = response.getData('assignment-submissions');
      if (submitData !== null) {
        this.submissions = submitData.attributes;
      }

      for (let review of data.for) {
        review.reviewer = new Site.User(review.reviewer);
      }
      for (let review of data.by) {
        review.reviewee = new Site.User(review.reviewee);
      }

      this.forReviews = data.for;
      this.byReviews = data.by;

      console.log(this.forReviews);
    },
    submit() {
      const text = this.editor.textarea.value.trim();
      if (text === '') {
        Site.toast(this, 'You must enter some text to submit');
        return;
      }

      let submissions = {};
      for (let tag in this.submissions) {
        submissions[tag] = {
          'id': this.submissions[tag][0].id,
          'date': this.submissions[tag][0].date
        };

      }

      let params = {
        type: 'text/plain',
        text: text,
        submissions: submissions
      }

      Site.api.post(`/api/review/staffreview/${this.assigntag}/${this.user.member.id}`, params)
          .then((response) => {
            if (!response.hasError()) {
              this.editor.textarea.value = '';
              this.take(response);
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
      return this.$site.TimeFormatter.relativeUNIX(time, null);
    },
    showSubmissions(review) {
      let submissions = review.meta.review.submissions;

      let ret = '';
      for (let tag in submissions) {
        ret += this.$site.TimeFormatter.absoluteUNIX(submissions[tag].date);
      }

      if (ret === '') {
        return '';
      }

      return 'Submission: ' + ret;
    }
  }
}
</script>
