<template>
  <div class="cl-reviews">
    <h3>Reviews of this assignment appear here.</h3>
    <p class="cl-reviews-none" v-if="reviewing.length === 0">*** None Yet ***</p>
    <div v-for="(id,index) in json.ids" class="cl-review">
      <review-chat :json="json" :context="context" :chat_id="id" :anon_index = "index"></review-chat>
    </div>
  </div>
</template>

<script>

import ReviewChatVue from './ReviewChat.vue'

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
      shownAnnotation: null,
      reviewing: [],
      context: "reviewee", // context of the current file
    }
  },
  components: {
    reviewChat: ReviewChatVue,
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
    },
    show(svg, width, height, image_src) {
      this.shownAnnotation = {
        svg: svg,
        width: width,
        height: height,
        image_src: image_src
      };
    }
  }
}
</script>
