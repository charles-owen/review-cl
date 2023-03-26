<template>
  <div class="cl-reviews">
    <h3>Reviews of this assignment appear here.</h3>
    <p class="cl-reviews-none" v-if="reviews.length === 0">*** None Yet ***</p>
    <div v-for="review in reviews" class="cl-review">
      <h3 :class="review.role !== undefined ? 'staff' : ''">{{formatTime(review.time)}}
        <span v-if="review.role !== undefined">Staff Review</span>
        <span v-else>Review</span> by {{review.by}}
        <span class="cl-submitted">{{showSubmissions(review)}}</span></h3>
      <div class="cl-review-present">{{review.review}}</div>
    </div>
  </div>
</template>

<script>
/**
 * This is the inline vue for reviews of an assignment used by the
 * submission and page the course console grading page.
 *
 * @constructor ReviewsVue
 */
export default {
  props: ['json'],
  data: function () {
    return {
      assignTag: '',
      reviewing: [],
    }
  },
  mounted() {
    this.assignTag = this.json.assignTag;
    this.reviewing = this.json.reviewing;
  },
  methods: {
    formatTime(time) {
      return this.$site.TimeFormatter.relativeUNIX(time, null);
    },
    showSubmissions(review) {
      let ret = '';
      for (let tag in review.submissions) {
        if (ret !== '') {
          ret += ' / ';
        }
        ret += this.$site.TimeFormatter.absoluteUNIX(review.submissions[tag].date);
      }

      if (ret === '') {
        return '';
      }

      return 'Submission: ' + ret;
    }
  }
}
</script>