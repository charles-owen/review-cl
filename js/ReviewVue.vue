<template>
  <div class="content">
    <div class="full">
      <div v-for="submission in json.submissions" class="cl-submission-view">
        <h2>{{submission.name}}</h2>
        <pre v-if="submission.type === 'text'" class="cl-preview yellow-pad">{{submission.text}}</pre>
        <div class="hue-slider-container">
            {{ hueValue }}%
            <input
              type="range"
              min="1"
              max="100"
              id="hueSlider"
              v-model="hueValue"
              class="slider"
            />
        </div>
        <div class="hue-slider-container">
            Line width: {{ widthValue }}
            <input
              type="range"
              min="1"
              max="50"
              id="widthSlider"
              v-model="widthValue"
              class="slider"
            />
        </div>
        <div class="container">

          <!-- <figure v-if="submission.type === 'image'" class="cl-preview"> -->
          <img ref="diagramImage" class="diagram" :src="previewImg(submission)">
          <canvas class="canvas-drawing" id="drawing"></canvas>
          <svg ref="svgImage" class="svg-drawing" id="drawing-svg" xmlns="http://www.w3.org/2000/svg"></svg>
          <!-- </figure> -->
        </div>

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
        <div class="cl-review-present">{{review.meta.review.review}}</div>
        <svg xmlns="http://www.w3.org/2000/svg" v-html="review.meta.annotation.annotation" :height="review.meta.annotation_height.annotation_height" :width="review.meta.annotation_width.annotation_width"></svg>
      </div>
    </div>
  </div>
</template>

<style scoped> @import "./styles.css" </style>

<script>
import {UserVueBase} from 'users-cl/index'
import {CanvasHandler, cssColor} from './canvas_handler'

var handler = new CanvasHandler();

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
      submissions: {},
      resizeObserver: null,
      hueValue: 50,
      widthValue: 5,
    }
  },
  mounted() {
    this.setTitle('Peer Reviewing');
    this.reviewing = this.json.reviewing;

    const element = this.$refs['editor'];
    this.editor = new this.$site.Editor(element, {
      height: '10em',
      classes: ['yellow-pad']
    });

    let submissions = {};
    for (const submission of this.json.submissions) {
      submissions[submission.tag] = {
        'id': submission.id,
        'date': submission.date
      };
    }

    this.submissions = submissions;

    this.annotation = this.$refs['svgImage'][0];

    this.resizeObserver = new ResizeObserver(this.onResize);
    this.resizeObserver.observe(this.$refs.diagramImage[0]);
    this.onResize();

    handler.init();

  },
  beforeUnmount() {
    this.resizeObserver.unobserve(this.$refs.diagramImage[0]);
  },
  methods: {
    submit() {
      const text = this.editor.textarea.value.trim();
      if (text === '') {
        Site.toast(this, 'You must enter some text to submit');
        return;
      }

      const annotation = this.annotation.innerHTML;

      let params = {
        type: 'text/plain',
        text: text,
        annotation: annotation,
        annotation_width: this.annotation_width,
        annotation_height: this.annotation_height,
        submissions: this.submissions
      }

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
    },
    onResize() {
      handler.setSize(this.$refs.diagramImage[0]);
      this.annotation_width = this.$refs.diagramImage[0].clientWidth;
      this.annotation_height = this.$refs.diagramImage[0].clientHeight;
    },
  },
  watch: {
    hueValue(newVal, oldVal){
      handler.hue = newVal;
      var slider = document.getElementById('hueSlider');
      slider.style.accentColor = cssColor(handler.hue, handler.saturation, handler.lightness);
    },
    widthValue(newVal, oldVal){
      handler.line_width = newVal;
    }
  }
}
</script>
