<template>
  <div class="cl-reviews">
    <h3>Reviews of this assignment appear here.</h3>
    <p class="cl-reviews-none" v-if="reviews.length === 0">*** None Yet ***</p>
    <table class="small">
      <tr>
        <th>Review Annotations</th>
      </tr>
      <tr v-for="(review, index) in reviews">
        <td><review-annotation :id="index" :time="review.time" :author="review.by" :svg="review.annotation" :width="review.annotation_width" :height="review.annotation_height" :submission_id="Object.values(review.submissions)[0].id" v-on:show="show"></review-annotation></td>
        <!-- <td>{{index + 1}}th review {{formatTime(review.time)}} by {{review.by}}</td> -->
      </tr>
    </table>
    <div v-if="shownAnnotation !== null">
      <figure v-if="previewImg !== null" class="cl-preview">
        <div class="cl-review-diagram">
          <img ref="diagramImage" :src="shownAnnotation.image_src">
          <svg xmlns="http://www.w3.org/2000/svg" v-html="shownAnnotation.svg" :height="shownAnnotation.height" :width="shownAnnotation.width"></svg>
        </div>
      </figure>
    </div>


    <div v-for="review in reviews" class="cl-review">
      <h3 :class="review.role !== undefined ? 'staff' : ''">{{formatTime(review.time)}}
        <span v-if="review.role !== undefined">Staff Review</span>
        <span v-else>Review</span> by {{review.by}}
        <span class="cl-submitted">{{showSubmissions(review)}}</span></h3>
      <div class="cl-review-present">
        <review-annotation :id="index" :time="review.time" :author="review.by" :svg="review.annotation" :width="review.annotation_width" :height="review.annotation_height" :submission_id="Object.values(review.submissions)[0].id" v-on:show="show">
          {{review.review}}
        </review-annotation>
      </div>
    </div>
  </div>
</template>

<script>

import ReviewAnnotationVue from './ReviewAnnotationVue.vue';
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
      reviews: [],
      shownAnnotation: null,
    }
  },
  components: {
    reviewAnnotation: ReviewAnnotationVue
  },
  mounted() {
    this.assignTag = this.json.assignTag;
    this.reviews = this.json.reviews;
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